import os
import locale
import logging
import numpy as np
import settings
import time
import datetime
from environment import Environment
from agent import Agent
from policy_network import PolicyNetwork
#from visualizer import Visualizer

logger = logging.getLogger(__name__)
locale.setlocale(locale.LC_ALL, 'ko_KR.UTF-8')

class PolicyLearner:

    def __init__(self, coin_code, coin_chart, training_data=None, model_ver=None,
                 min_trading_unit=1, max_trading_unit=2,
                 delayed_reward_threshold=.05, start_date=None, end_date=None, lr=0.01):

        self.coin_code = coin_code
        self.coin_chart = coin_chart

        self.environment = Environment(coin_chart)
        self.agent = Agent(self.environment,
                           min_trading_unit=min_trading_unit,
                           max_trading_unit=max_trading_unit,
                           delayed_reward_threshold=delayed_reward_threshold,
                           coin_code=coin_code)

        self.training_data = training_data
        self.sample = None
        self.training_data_idx = -1

        self.model_ver = model_ver
        self.start_date = start_date
        self.end_date = end_date

        self.num_features = 17
        self.policy_network = PolicyNetwork(input_dim=self.num_features, output_dim=self.agent.NUM_ACTIONS, lr=lr)


    def reset(self):
        self.sample = None
        self.training_data_idx = -1

    def fit(self, num_epoches=1000, max_memory=60, balance=10000000, discount_factor=0, start_epsilon=.5,
            learning=True):

        logger.info("Learning Rate: {lr}, Discount Factor: {discount_factor}, "
                    "Trading Unit: [{min_trading_unit}, {max_trading_unit}], "
                    "Delayed Reward threshold: {delayed_reward_threshold}, "
                    "Training period: [{start_date} ~ {end_date}]".format(
            lr=self.policy_network.lr,
            discount_factor=discount_factor,
            min_trading_unit=self.agent.min_trading_unit,
            max_trading_unit=self.agent.max_trading_unit,
            delayed_reward_threshold=self.agent.delayed_reward_threshold,
            start_date=self.start_date,
            end_date=self.end_date))

        epoch_summary_dir = os.path.join(
            settings.BASE_DIR, 'epoch_summary/%s/epoch_summary_%s' % (
                self.coin_code, settings.timestr))
        if not os.path.isdir(epoch_summary_dir):
            os.makedirs(epoch_summary_dir)

        self.agent.set_balance(balance)

        max_portfolio_value = 0
        epoch_win_cnt = 0

        for epoch in range(num_epoches):
#            loss = 0.
            accuracy = 0.
            itr_cnt = 0; win_cnt = 0
            exploration_cnt = 0
            batch_size = 0
            pos_learning_cnt = 0; neg_learning_cnt = 0

            memory_sample = []; memory_action = []; memory_reward = []
            memory_prob = []; memory_pv = [];
            memory_num_coins = []
            memory_exp_idx = []; memory_learning_idx = []
            
            self.environment.reset()
            self.agent.reset()
            self.policy_network.reset()
            self.reset()
#            self.visualizer.clear([0, len(self.coin_chart)])

            if learning:
                epsilon = start_epsilon * (1. - float(epoch) / (num_epoches - 1))
            else:
                epsilon = 0

            while True:
                next_sample = self._build_sample()

                if next_sample is None:
                    break

                action, confidence, exploration = self.agent.decide_action(self.policy_network, self.sample, epsilon)

                immediate_reward, delayed_reward = self.agent.act(action, confidence)

                memory_sample.append(next_sample); memory_action.append(action); memory_reward.append(immediate_reward)
                memory_pv.append(self.agent.portfolio_value); memory_num_coins.append(self.agent.num_coins)

                memory = [(memory_sample[i], memory_action[i], memory_reward[i]) for i in list(range(len(memory_action)))[-max_memory:]]

                if exploration:
                    memory_exp_idx.append(itr_cnt)
                    memory_prob.append([np.nan] * Agent.NUM_ACTIONS)
                else:
                    memory_prob.append(self.policy_network.prob)

                batch_size += 1
                itr_cnt += 1
                exploration_cnt += 1 if exploration else 0
                win_cnt += 1 if delayed_reward > 0 else 0

                if delayed_reward == 0 and batch_size >= max_memory:
                    delayed_reward = immediate_reward
                    self.agent.base_portfolio_value = self.agent.portfolio_value

                if learning and delayed_reward != 0:
                    batch_size = min(batch_size, max_memory)
                    x, y = self._get_batch(memory, batch_size, discount_factor, delayed_reward)

                    if len(x) > 0:
                        accuracy += self.policy_network.train_on_batch(x, y)
                        memory_learning_idx.append([itr_cnt, delayed_reward])
                    batch_size = 0

            num_epoches_digit = len(str(num_epoches))
            epoch_str = str(epoch + 1).rjust(num_epoches_digit, '0')


            logger.info("[Epoch %s/%s]\tEpsilon:%.4f\t#Expl.:%d/%d\t"
                        "#Buy:%d\t#Sell:%d\t#Hold:%d\t"
                        "#Coins:%d\tPV:%s\t"
                        "#Accuracy:%10.6f" % (
                            epoch_str, num_epoches, epsilon, exploration_cnt, itr_cnt,
                            self.agent.num_buy, self.agent.num_sell, self.agent.num_hold,
                            self.agent.num_coins,
                            locale.currency(self.agent.portfolio_value, grouping=True),
                            accuracy))

            max_portfolio_value = max(max_portfolio_value, self.agent.portfolio_value)
            if self.agent.portfolio_value > self.agent.initial_balance:
                epoch_win_cnt += 1

        logger.info("Max PV: %s, \t # Win: %d" % (
            locale.currency(max_portfolio_value, grouping=True), epoch_win_cnt))

    def _get_batch(self, memory, batch_size, discount_factor, delayed_reward):
        x = np.zeros((batch_size, 1, self.num_features))
        y = np.full((batch_size, self.agent.NUM_ACTIONS), 0.5)

        for i, (sample, action, reward) in enumerate(reversed(memory[-batch_size:])):
            x[i] = np.array(sample).reshape((-1, 1, self.num_features))
            y[i, action] = (delayed_reward + 1) / 2

            if discount_factor > 0:
#                y[i] = tl.rein.discount_episode_rewards(y[i], discount_factor)
                y[i, action] *= discount_factor ** i
        return x, y

    def _build_sample(self):
        self.environment.observe()
        if len(self.training_data) > self.training_data_idx + 1:
            self.training_data_idx += 1
            self.sample = self.training_data.iloc[self.training_data_idx].tolist()
            self.sample.extend(self.agent.get_states())
            return self.sample
        return None

    def trade(self, model_path=None, balance=2000000):
        if model_path is None:
            return
        self.policy_network.load_model(model_path=model_path)
        self.fit_sim(balance=balance, num_epoches=1)


    def fit_sim(self, num_epoches=1, max_memory=60, balance=10000000, discount_factor=0):

        logger.info("Learning Rate: {lr}, Discount Factor: {discount_factor}, "
                    "Trading Unit: [{min_trading_unit}, {max_trading_unit}], "
                    "Delayed Reward threshold: {delayed_reward_threshold}, ".format(
            lr=self.policy_network.lr,
            discount_factor=discount_factor,
            min_trading_unit=self.agent.min_trading_unit,
            max_trading_unit=self.agent.max_trading_unit,
            delayed_reward_threshold=self.agent.delayed_reward_threshold))

        self.agent.set_balance(balance)

        max_portfolio_value = 0
        epoch_win_cnt = 0

        for epoch in range(num_epoches):
            accuracy = 0.
            itr_cnt = 0
            win_cnt = 0
            exploration_cnt = 0
            batch_size = 0

            memory_sample = []
            memory_action = []
            memory_reward = []
            memory_prob = []
            memory_pv = []
            memory_num_coins = []

            self.environment.reset()
            self.agent.reset()
            self.policy_network.reset()
            self.reset()

            while True:
                next_sample = self._build_sample_simul()
                print((self.environment.observe_simul()[2] + datetime.timedelta(minutes=1)).strftime("%Y-%m-%d %H:%M:00"))

                if next_sample is None:
                    break
                action, confidence, exploration = self.agent.decide_action(self.policy_network, next_sample, epsilon=0)

                immediate_reward, delayed_reward = self.agent.act_simul(action, confidence)

                memory_sample.append(next_sample)
                memory_action.append(action)
                memory_reward.append(immediate_reward)
                memory_pv.append(self.agent.portfolio_value)
                memory_num_coins.append(self.agent.num_coins)

                memory_prob.append(self.policy_network.prob)

                batch_size += 1
                itr_cnt += 1
                exploration_cnt += 1 if exploration else 0
                win_cnt += 1 if delayed_reward > 0 else 0

                if delayed_reward == 0 and batch_size >= max_memory:
                    delayed_reward = immediate_reward
                    self.agent.base_portfolio_value = self.agent.portfolio_value

                time.sleep(60)

            num_epoches_digit = len(str(num_epoches))
            epoch_str = str(epoch + 1).rjust(num_epoches_digit, '0')

            logger.info("[Epoch %s/%s]\tEpsilon:%.4f\t#Expl.:%d/%d\t"
                        "#Buy:%d\t#SellPV::%d\t#Hold:%d\t"
                        "#Coins:%d\t%s\t"
                        "#Accuracy:%10.6f" % (
                            epoch_str, num_epoches, epsilon, exploration_cnt, itr_cnt,
                            self.agent.num_buy, self.agent.num_sell, self.agent.num_hold,
                            self.agent.num_coins,
                            locale.currency(self.agent.portfolio_value, grouping=True),
                            accuracy))

            max_portfolio_value = max(max_portfolio_value, self.agent.portfolio_value)
            if self.agent.portfolio_value > self.agent.initial_balance:
                epoch_win_cnt += 1

        logger.info("Max PV: %s, \t # Win: %d" % (
            locale.currency(max_portfolio_value, grouping=True), epoch_win_cnt))


    def _build_sample_simul(self):
        data = self.environment.observe_simul()[0]
        if data is not None:
            self.sample = data.tolist()
            self.sample.extend(self.agent.get_states_simul())
            return self.sample
        else:
            print("None sample")
            return None
