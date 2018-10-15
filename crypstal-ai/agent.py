import numpy as np

class Agent:
    # agent 상태의 차원
    STATE_DIM = 2  # 코인 보유 비율, 포트폴리오 가치 비율

    # 매매 수수료 및 세금
    TRADING_CHARGE = 0  # 거래 수수료
    TRADING_TAX = 0  # 거래세

    # action
    ACTION_BUY = 0  # 매수
    ACTION_SELL = 1  # 매도
    ACTION_HOLD = 2  # 관망
    ACTIONS = [ACTION_BUY, ACTION_SELL]
    NUM_ACTIONS = len(ACTIONS)  # 출력 수(매수, 매도)

    def __init__(self, environment, min_trading_unit=1, max_trading_unit=2, delayed_reward_threshold=.05):

        # Environment 객체
        self.environment = environment
        self.min_trading_unit = min_trading_unit  # 최소 거래 단위
        self.max_trading_unit = max_trading_unit  # 최대 거래 단위
        self.delayed_reward_threshold = delayed_reward_threshold

        # Agent 클래스의 속성
        self.initial_balance = 0  # 초기 자본금
        self.balance = 0  # 현재 현금 잔고
        self.num_coins = 0  # 보유 주식 수
        self.portfolio_value = 0  # PV = balance + num_coins * 현재 코인 가격
        self.base_portfolio_value = 0  # 직전 학습 시점의 PV
        self.num_buy = 0  # 매수 횟수
        self.num_sell = 0  # 매도 횟수
        self.num_hold = 0  # 홀딩 횟수
        self.immediate_reward = 0  # 즉시 보상

        # Agent 클래스의 상태
        self.ratio_hold = 0  # 코인 보유 비율(최대 코인 수 대비 현재 보유 증인 코인 수 비율)
        self.ratio_portfolio_value = 0  # 포트폴리오 가치 비율(직전 지연 보상이 발생했을 시 PV 대비 현재 PV의 비율)

    def reset(self): # epoch 마다 초기화
        self.balance = self.initial_balance
        self.num_coins = 0
        self.portfolio_value = self.initial_balance
        self.base_portfolio_value = self.initial_balance
        self.num_buy = 0
        self.num_sell = 0
        self.num_hold = 0
        self.immediate_reward = 0
        self.ratio_hold = 0
        self.ratio_portfolio_value = 0

    def set_balance(self, balance): # 초기 자본금 설정
        self.initial_balance = balance

    def get_states(self): # agent 상태 반환

        # 코인 보유 비율 = 보유 코인 수 / (포폴 가치/ 현재 코인 가격)
        #코인 보유 비율이 적으면 아무래도 매수 관점에서 투자하고 코인 비율이 높으면 매도 관점에서 투자에 임함
        self.ratio_hold = self.num_coins / max(int(self.portfolio_value / self.environment.get_price()), 1)

        # 포폴 가치 비율 = 포폴 가치 / 기준 포폴 가치
        #포폴 가치 비율이 0에 가까우면 손실이 큰 것이고 1보다 크면 수익이 발생한 것
        self.ratio_portfolio_value = self.portfolio_value / self.base_portfolio_value

        return (self.ratio_hold,
                self.ratio_portfolio_value)


    def decide_action(self, policy_network, sample, epsilon):
        confidence = 0.
        # 탐험 결정
        if np.random.rand() < epsilon:
            exploration = True
            action = np.random.randint(self.NUM_ACTIONS)  # 무작위로 행동 결정(매수 or 매도)
        else:
            exploration = False
            prob = policy_network.predict(sample)  # 정책신경망을 통해 각 행동에 대한 확률
            action = np.argmax(prob)
            confidence = prob[action] # 매수나 매도 중 큰 확률

        return action, confidence, exploration

    def validate_action(self, action): # 결정한 action을 수행할 수 있는지 여부 확인
        validity = True
        if action == Agent.ACTION_BUY:
            # 코인 매수 가능한지 확인
            if self.balance < self.environment.get_price() * (1 + self.TRADING_CHARGE) * self.min_trading_unit:
                validity = False

        elif action == Agent.ACTION_SELL:
            # 코인 매도 가능한지 확인
            if self.num_coins <= 0:
                validity = False
        return validity

    def decide_trading_unit(self, confidence): # 매수/매도 단위 결정
        if np.isnan(confidence):
            return self.min_trading_unit

        # action의 확률(confidence)가 클수록 매수/매도 단위 크게
        added_traiding = max(
            min(int(confidence * (self.max_trading_unit - self.min_trading_unit)),
                self.max_trading_unit-self.min_trading_unit),0)

        return self.min_trading_unit + added_traiding

    def act(self, action, confidence):
        if not self.validate_action(action):
            action = Agent.ACTION_HOLD # action을 할 수 없으면 관망

        # 환경에서 현재 가격 얻기
        current_price = self.environment.get_price()

        # 즉시 보상 초기화
        self.immediate_reward = 0

        # 매수
        if action == Agent.ACTION_BUY:
            # 매수할 단위를 판단
            trading_unit = self.decide_trading_unit(confidence)
            balance = self.balance - current_price * (1 + self.TRADING_CHARGE) * trading_unit

            if balance < 0: # 보유 현금이 모자랄 경우 보유 현금으로 가능한 만큼 최대한 매수
                trading_unit = max(min(
                    int(self.balance / (current_price * (1 + self.TRADING_CHARGE))), self.max_trading_unit),
                    self.min_trading_unit
                )
            # 수수료를 적용하여 총 매수 금액 산정
            invest_amount = current_price * (1 + self.TRADING_CHARGE) * trading_unit
            self.balance -= invest_amount  # 보유 현금을 갱신
            self.num_coins += trading_unit  # 보유 코인 수를 갱신
            self.num_buy += 1  # 매수 횟수 증가
            #print("매수")

        # 매도
        elif action == Agent.ACTION_SELL:
            # 매도할 단위를 판단
            trading_unit = self.decide_trading_unit(confidence)
            # 보유 코인이 모자랄 경우 가능한 만큼 최대한 매도
            trading_unit = min(trading_unit, self.num_coins)
            # 수수료 거래세 적용하여 매도
            invest_amount = current_price * (1 - (self.TRADING_TAX + self.TRADING_CHARGE)) * trading_unit
            self.num_coins -= trading_unit  # 보유 코인 수를 갱신
            self.balance += invest_amount  # 보유 현금을 갱신
            self.num_sell += 1  # 매도 횟수 증가
            #print("매도")


        # 관망
        elif action == Agent.ACTION_HOLD:
            self.num_hold += 1  # 관망 횟수 증가


        # 포트폴리오 가치 갱신
        self.portfolio_value = self.balance + current_price * self.num_coins
        loss = ((self.portfolio_value - self.base_portfolio_value) / self.base_portfolio_value)

        # 즉시 보상 판단
        self.immediate_reward = 1 if loss >= 0 else -1

        # 지연 보상 판단
        if loss > self.delayed_reward_threshold:
            delayed_reward = 1 # 수익 -> reward 1
            self.base_portfolio_value = self.portfolio_value
        elif loss < -self.delayed_reward_threshold:
            delayed_reward = -1 # 손실 -> reward -1
            self.base_portfolio_value = self.portfolio_value
        else:
            delayed_reward = 0
        return self.immediate_reward, delayed_reward

'''
보상 바꿔보기
'''