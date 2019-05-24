from common.libs import db_mongo
from jobs import update_order


if __name__ == '__main__':
    update_order.start_update_order(30*60)
