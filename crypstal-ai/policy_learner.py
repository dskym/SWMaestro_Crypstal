import os
import locale
import logging
import numpy as np
import settings
from environment import Environment
from agent import Agent
from policy_network import PolicyNetwork
from visualizer import Visualizer

logger = logging.getLogger(__name__)
locale.setlocale(locale.LC_ALL, 'ko_KR.UTF-8')

class PolicyLearner:

    def __init__(self, coin_code, coin_chart, training_data=None,
                 min_trading_unit=1, max_trading_unit=2,
                 delayed_reward_threshold=.05, lr=0.01):

        self.coin_code = coin_code  # 코인 종류
        self.coin_chart = coin_chart

        self.environment = Environment(coin_chart)
        self.agent = Agent(self.environment,
                           min_trading_unit=min_trading_unit,
                           max_trading_unit=max_trading_unit,
                           delayed_reward_threshold=delayed_reward_threshold)

        self.training_data = training_data  # 학습 데이터
        self.sample = None # 읽어올 데이터
 #       self.date = None
        self.training_data_idx = -1

        self.num_features = self.training_data.shape[1] + self.agent.STATE_DIM # -1 # input_dim = 15 + 2 = 17
        self.policy_network = PolicyNetwork(input_dim=self.num_features, output_dim=self.agent.NUM_ACTIONS, lr=lr)

        self.visualizer = Visualizer()

    def reset(self):
        self.sample = None
        self.training_data_idx = -1 # 차트 처음부터 읽게끔

    def fit(self, num_epoches=1000, max_memory=60, balance=10000000, discount_factor=0, start_epsilon=.5,
            learning=True, exploration=False):

        logger.info("Learning Rate: {lr}, Discount Factor: {discount_factor}, "
                    "Trading Unit: [{min_trading_unit}, {max_trading_unit}], "
                    "Delayed Reward threshold: {delayed_reward_threshold}".format(
            lr=self.policy_network.lr,
            discount_factor=discount_factor,
            min_trading_unit=self.agent.min_trading_unit,
            max_trading_unit=self.agent.max_trading_unit,
            delayed_reward_threshold=self.agent.delayed_reward_threshold))

        # 가시화
        self.visualizer.prepare(self.environment.coin_chart) # 차트 그리기
        # 저장 폴더
        epoch_summary_dir = os.path.join(
            settings.BASE_DIR, 'epoch_summary/%s/epoch_summary_%s' % (
                self.coin_code, settings.timestr))
        if not os.path.isdir(epoch_summary_dir):
            os.makedirs(epoch_summary_dir)

        # 에이전트 초기 자본금 설정
        self.agent.set_balance(balance)

        # 학습에 대한 정보 초기화
        max_portfolio_value = 0
        epoch_win_cnt = 0

        # 학습 반복
        for epoch in range(num_epoches):    
            # 에포크 관련 정보 초기화
            loss = 0.
            itr_cnt = 0; win_cnt = 0 # 수행 epoch 수 / 수행 epoch 중 수익 개수
            exploration_cnt = 0 # 무작위 투자 수
            batch_size = 0
            pos_learning_cnt = 0; neg_learning_cnt = 0 # 수익으로 긍정적지연보상 / 손실로 부정적지연보상

            # 메모리 초기화
            memory_sample = []; memory_action = []; memory_reward = []
            memory_prob = []; memory_pv = [];
            memory_num_coins = []
            memory_exp_idx = []; memory_learning_idx = [] # 탐험위치, 학습위치
            
            # 초기화
            self.environment.reset()
            self.agent.reset()
            self.policy_network.reset()
            self.reset()
            self.visualizer.clear([0, len(self.coin_chart)])

            # 학습을 진행할 수록 탐험 비율 감소
            if learning:
                epsilon = start_epsilon * (1. - float(epoch) / (num_epoches - 1))
            else:
                epsilon = 0

            if exploration:
                epsilon = 1

            while True:
                next_sample = self._build_sample()

                if next_sample is None: # 데이터 다 읽은 것
                    break

                # action 결정
                action, confidence, exploration = self.agent.decide_action(self.policy_network, self.sample, epsilon)

                # action 후, 즉시 보상과 지연 보상 획득
                immediate_reward, delayed_reward = self.agent.act(action, confidence)

                # action 결과 기억
                memory_sample.append(next_sample); memory_action.append(action); memory_reward.append(immediate_reward)
                memory_pv.append(self.agent.portfolio_value); memory_num_coins.append(self.agent.num_coins)

                memory = [(memory_sample[i], memory_action[i], memory_reward[i]) for i in list(range(len(memory_action)))[-max_memory:]]

                if exploration:
                    memory_exp_idx.append(itr_cnt)
                    memory_prob.append([np.nan] * Agent.NUM_ACTIONS)
                else:
                    memory_prob.append(self.policy_network.prob)

                # 반복에 대한 정보 갱신
                batch_size += 1
                itr_cnt += 1
                exploration_cnt += 1 if exploration else 0
                win_cnt += 1 if delayed_reward > 0 else 0

                # learning = True 이고, 지연 보상이 존재할 경우 : policy_network 갱신
                if delayed_reward == 0 and batch_size >= max_memory:
                    delayed_reward = immediate_reward
                    self.agent.base_portfolio_value = self.agent.portfolio_value

                if learning and delayed_reward != 0:
                    # 배치 학습 데이터 크기
                    batch_size = min(batch_size, max_memory)
                    # 배치 학습 데이터 생성
                    x, y = self._get_batch(memory, batch_size, discount_factor, delayed_reward)
                    if len(x) > 0:
                        if delayed_reward > 0:
                            pos_learning_cnt += 1
                        else:
                            neg_learning_cnt += 1
                        # 정책 신경망 갱신
                        loss += self.policy_network.train_on_batch(x, y)
                        memory_learning_idx.append([itr_cnt, delayed_reward])
                    batch_size = 0

            # 가시화
            num_epoches_digit = len(str(num_epoches))
            epoch_str = str(epoch + 1).rjust(num_epoches_digit, '0')

            self.visualizer.plot(
                epoch_str=epoch_str, num_epoches=num_epoches, epsilon=epsilon,
                action_list=Agent.ACTIONS, actions=memory_action,
                num_coins=memory_num_coins, outvals=memory_prob,
                exps=memory_exp_idx, learning=memory_learning_idx,
                initial_balance=self.agent.initial_balance, pvs=memory_pv
            )
            self.visualizer.save(os.path.join(
                epoch_summary_dir, 'epoch_summary_%s_%s.png' % (
                    settings.timestr, epoch_str)))

            # 로그 기록
            if pos_learning_cnt + neg_learning_cnt > 0:
                loss /= pos_learning_cnt + neg_learning_cnt
            logger.info("[Epoch %s/%s]\tEpsilon:%.4f\t#Expl.:%d/%d\t"
                        "#Buy:%d\t#Sell:%d\t#Hold:%d\t"
                        "#Coins:%d\tPV:%s\t"
                        "POS:%s\tNEG:%s\tLoss:%10.6f" % (
                            epoch_str, num_epoches, epsilon, exploration_cnt, itr_cnt,
                            self.agent.num_buy, self.agent.num_sell, self.agent.num_hold,
                            self.agent.num_coins,
                            locale.currency(self.agent.portfolio_value, grouping=True),
                            pos_learning_cnt, neg_learning_cnt, loss))

            # 학습 관련 정보 갱신
            max_portfolio_value = max(max_portfolio_value, self.agent.portfolio_value)
            if self.agent.portfolio_value > self.agent.initial_balance:
                epoch_win_cnt += 1

        # 학습 관련 정보 로그 기록
        logger.info("Max PV: %s, \t # Win: %d" % (
            locale.currency(max_portfolio_value, grouping=True), epoch_win_cnt))

    def _get_batch(self, memory, batch_size, discount_factor, delayed_reward):
        x = np.zeros((batch_size, 1, self.num_features))
        y = np.full((batch_size, self.agent.NUM_ACTIONS), 0.5)

        for i, (sample, action, reward) in enumerate(reversed(memory[-batch_size:])):
            x[i] = np.array(sample).reshape((-1, 1, self.num_features))
            y[i, action] = (delayed_reward + 1) / 2
            if discount_factor > 0:
                y[i, action] *= discount_factor ** i
        return x, y

    def _build_sample(self):
        self.environment.observe()
        if len(self.training_data) > self.training_data_idx + 1:
            self.training_data_idx += 1
            self.sample = self.training_data.iloc[self.training_data_idx].tolist() # sample 차원 15
            self.sample.extend(self.agent.get_states()) # sample 차원 17
            return self.sample
        return None

    def trade(self, model_path=None, balance=2000000, exploration=False): # 투자 시뮬레이션 부분
        if model_path is None:
            return
        self.policy_network.load_model(model_path=model_path)

        if exploration:
            self.fit(balance=balance, num_epoches=1, learning=False, exploration=True)
        else:
            self.fit(balance=balance, num_epoches=1, learning=False)
    def pv(self):
        return self.agent.portfolio_value