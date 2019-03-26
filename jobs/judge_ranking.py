import time

from common.libs import db_mongo
from common.libs.tools import StrTools


def judge_24h():
    c_time = int(time.time())
    door_time = c_time - StrTools.DAY_SECONDS
    items = db_mongo.get_table('plat2', 'order').find({'order_create_time': {'$gt': door_time}})
    for item in items:
        print(item)


judge_24h()
