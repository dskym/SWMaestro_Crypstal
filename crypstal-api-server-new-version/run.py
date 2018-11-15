import sys
import getopt


def main():
    try:
        opts, args = getopt.getopt(sys.argv[1:], "f:c:a:", ["filename=", "coin=", "asset="])
    except getopt.GetoptError as err:
        print(str(err))
        sys.exit(1)

    for opt, arg in opts:
        if opt == '-f' or opt == '--filename':
            print('filename : ' + arg)
        elif opt == '-c' or opt == '--coin':
            print('coin : ' + arg)
        elif opt == '-a' or opt == '--asset':
            print('asset : ' + arg)

    for i in range(100000000):
        pass

    print('end')


if __name__ == '__main__':
    main()
