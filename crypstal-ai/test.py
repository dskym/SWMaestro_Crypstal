from bithumb_machine import BithumbMachine


bithumb_machine = BithumbMachine()

#result = bithumb_machine.buy_order("BTC", 227000, 1)
#print(result)
#result = bithumb_machine.sell_order("BTC", 200000, 1)
#print(result)
ticker = bithumb_machine.get_ticker("BTC")
print(ticker['close'])