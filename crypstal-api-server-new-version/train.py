import sys
import getopt


def main():
    try:
        opts, args = getopt.getopt(sys.argv[1:], "f:t:c:", ["from=", "to=", "coin="])
    except getopt.GetoptError as err:
        print(str(err))
        sys.exit(1)

    for opt, arg in opts:
        if opt == '-f' or opt == '--from':
            print('from : ' + arg)
        elif opt == '-t' or opt == '--to':
            print('to : ' + arg)
        elif opt == '-c' or opt == '--coin':
            print('coin : ' + arg)

    for i in range(100000000):
        pass

    print('end')


if __name__ == '__main__':
    main()
