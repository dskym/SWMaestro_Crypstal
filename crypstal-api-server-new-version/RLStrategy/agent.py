import numpy as np

class Agent:

    STATE_DIM = 2
    TRADING_CHARGE = 0
    TRADING_TAX = 0

    # action
    ACTION_BUY = 0
    ACTION_SELL = 1
    ACTION_HOLD = 2
    ACTIONS = [ACTION_BUY, ACTION_SELL]
    NUM_ACTIONS = len(ACTIONS)

    def __init__(self, environment, min_trading_unit=1, max_trading_unit=2, delayed_reward_threshold=.05):

        self.environment = environment
        self.min_trading_unit = min_trading_unit
        self.max_trading_unit = max_trading_unit
        self.delayed_reward_threshold = delayed_reward_threshold

        self.initial_balance = 0
        self.balance = 0
        self.num_coins = 0
        self.portfolio_value = 0
        self.base_portfolio_value = 0
        self.num_buy = 0
        self.num_sell = 0
        self.num_hold = 0
        self.immediate_reward = 0

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
