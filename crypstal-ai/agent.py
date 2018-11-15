import numpy as np
import bithumb_machine

class Agent:

    STATE_DIM = 2
    TRADING_CHARGE = 0.0015
    TRADING_TAX = 0

    # action
    ACTION_BUY = 0
    ACTION_SELL = 1
    ACTION_HOLD = 2
    ACTIONS = [ACTION_BUY, ACTION_SELL]
    NUM_ACTIONS = len(ACTIONS)

    def __init__(self, environment, min_trading_unit=1, max_trading_unit=2, delayed_reward_threshold=.05, coin_code='BTC'):

        self.bithumb_machine = bithumb_machine.BithumbMachine()

        self.environment = environment
        self.min_trading_unit = min_trading_unit
        self.max_trading_unit = max_trading_unit
        self.delayed_reward_threshold = delayed_reward_threshold
        self.coin_code = coin_code

        self.initial_balance = 0
        self.balance = 0
        self.num_coins = 0
        self.portfolio_value = 0
        self.base_portfolio_value = 0
        self.num_buy = 0
        self.num_sell = 0
        self.num_hold = 0
        self.immediate_reward = 0
        self.current_price = 0

        self.ratio_hold = 0
        self.ratio_portfolio_value = 0

    def reset(self):
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

    def set_balance(self, balance):
        self.initial_balance = balance

    def get_states(self):

        self.ratio_hold = self.num_coins / max(int(self.portfolio_value / self.environment.get_price()), 1)
        self.ratio_portfolio_value = self.portfolio_value / self.base_portfolio_value

        return (self.ratio_hold,
                self.ratio_portfolio_value)

    def get_states_simul(self):
        if self.environment.observe_simul()[1] == 0 or np.isnan(self.environment.observe_simul()[1]):
            self.ratio_hold = self.num_coins
            self.ratio_portfolio_value = self.portfolio_value / self.base_portfolio_value
            return (self.ratio_hold,
                    self.ratio_portfolio_value)
        else:
            print('price', self.environment.observe_simul()[1])
            self.ratio_hold = self.num_coins / max(int(float(self.portfolio_value) / float(self.environment.observe_simul()[1])), 1)
            self.ratio_portfolio_value = self.portfolio_value / self.base_portfolio_value
            return (self.ratio_hold,
                    self.ratio_portfolio_value)


    def decide_action(self, policy_network, sample, epsilon):
        confidence = 0.

        if np.random.rand() < epsilon:
            exploration = True
            action = np.random.randint(self.NUM_ACTIONS)
        else:
            exploration = False
            prob = policy_network.predict(sample)
            action = np.argmax(prob)
            confidence = prob[action]

        return action, confidence, exploration

    def validate_action(self, action):
        validity = True
        if action == Agent.ACTION_BUY:
            if self.balance < self.environment.get_price() * (1 + self.TRADING_CHARGE) * self.min_trading_unit:
                validity = False

        elif action == Agent.ACTION_SELL:
            if self.num_coins <= 0:
                validity = False
        return validity


    def validate_action_simul(self, action):
        validity = True
        if action == Agent.ACTION_BUY:
            if self.balance < self.environment.observe_simul()[1] * (1 + self.TRADING_CHARGE) * self.min_trading_unit:
                validity = False

        elif action == Agent.ACTION_SELL:
            if self.num_coins <= 0:
                validity = False
        return validity


    def decide_trading_unit(self, confidence):
        if np.isnan(confidence):
            return self.min_trading_unit

        added_traiding = max(
            min(int(confidence * (self.max_trading_unit - self.min_trading_unit)),
                self.max_trading_unit-self.min_trading_unit),0)

        return self.min_trading_unit + added_traiding

    def act(self, action, confidence):
        if not self.validate_action(action):
            action = Agent.ACTION_HOLD

        current_price = self.environment.get_price()

        self.immediate_reward = 0

        if action == Agent.ACTION_BUY:
            trading_unit = self.decide_trading_unit(confidence)
            balance = self.balance - current_price * (1 + self.TRADING_CHARGE) * trading_unit

            if balance < 0:
                trading_unit = max(min(
                    int(self.balance / (current_price * (1 + self.TRADING_CHARGE))), self.max_trading_unit),
                    self.min_trading_unit
                )
            invest_amount = current_price * (1 + self.TRADING_CHARGE) * trading_unit
            self.balance -= invest_amount
            self.num_coins += trading_unit
            self.num_buy += 1

        elif action == Agent.ACTION_SELL:
            trading_unit = self.decide_trading_unit(confidence)
            trading_unit = min(trading_unit, self.num_coins)
            invest_amount = current_price * (1 - (self.TRADING_TAX + self.TRADING_CHARGE)) * trading_unit
            self.num_coins -= trading_unit
            self.balance += invest_amount
            self.num_sell += 1

        elif action == Agent.ACTION_HOLD:
            self.num_hold += 1
        self.portfolio_value = self.balance + current_price * self.num_coins
        loss = ((self.portfolio_value - self.base_portfolio_value) / self.base_portfolio_value)

        self.immediate_reward = 1 if loss >= 0 else -1

        if loss > self.delayed_reward_threshold:
            delayed_reward = 1
            self.base_portfolio_value = self.portfolio_value
        elif loss < -self.delayed_reward_threshold:
            delayed_reward = -1
            self.base_portfolio_value = self.portfolio_value
        else:
            delayed_reward = 0
        return self.immediate_reward, delayed_reward


    def act_simul(self, action, confidence):

        if not self.validate_action_simul(action):
            action = Agent.ACTION_HOLD

        if self.environment.observe_simul()[1] != 0:
            self.current_price = self.environment.observe_simul()[1]
        else:
            self.current_price = self.current_price
            action = Agent.ACTION_HOLD

        self.immediate_reward = 0

        if action == Agent.ACTION_BUY:
            trading_unit = self.decide_trading_unit(confidence)
            balance = self.balance - self.current_price * (1 + self.TRADING_CHARGE) * trading_unit

            if balance < 0:
                trading_unit = max(min(
                    int(self.balance / (self.current_price * (1 + self.TRADING_CHARGE))), self.max_trading_unit),
                    self.min_trading_unit
                )
            invest_amount = self.current_price * (1 + self.TRADING_CHARGE) * trading_unit
            print(trading_unit, "개 코인을",self.current_price,"원으로 매수하시오!")

            print(self.coin_code, self.current_price, trading_unit)

#            result = self.bithumb_machine.buy_order(self.coin_code, int(self.current_price), trading_unit)
#            print(result)
#            result1 = self.bithumb_machine.cancel_order(self.coin_code, 'bid',result['order_id'])
#            print(result1)

            self.balance -= invest_amount
            self.num_coins += trading_unit
            self.num_buy += 1

        elif action == Agent.ACTION_SELL:
            trading_unit = self.decide_trading_unit(confidence)
            trading_unit = min(trading_unit, self.num_coins)
            invest_amount = self.current_price * (1 - (self.TRADING_TAX + self.TRADING_CHARGE)) * trading_unit

            if self.balance + invest_amount < self.initial_balance:
                print("관망하시오!")
            else:
                print(trading_unit, "개 코인을",self.current_price,"원으로 매도하시오!")

                print(self.coin_code, self.current_price, trading_unit)

#                result = self.bithumb_machine.sell_order(self.coin_code, int(self.current_price), 0.001)
#                print(result)
#                result1 = self.bithumb_machine.cancel_order(self.coin_code, 'ask', result['order_id'])
#                print(result1)

                self.num_coins -= trading_unit
                self.balance += invest_amount
                self.num_sell += 1

        elif action == Agent.ACTION_HOLD:
            print("관망하시오!")
            self.num_hold += 1


        self.portfolio_value = self.balance + self.current_price * self.num_coins
        loss = ((self.portfolio_value - self.base_portfolio_value) / self.base_portfolio_value)

        self.immediate_reward = 1 if loss >= 0 else -1

        if loss > self.delayed_reward_threshold:
            delayed_reward = 1
            self.base_portfolio_value = self.portfolio_value
        elif loss < -self.delayed_reward_threshold:
            delayed_reward = -1
            self.base_portfolio_value = self.portfolio_value
        else:
            delayed_reward = 0

        print('balance :', self.balance)
        print('PV :',self.portfolio_value)

        return self.immediate_reward, delayed_reward
