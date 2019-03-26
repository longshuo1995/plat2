import time

from common.libs import db_mongo

DAY_SECONDS = 24*60*60


def judge_24h():
    c_time = int(time.time())
    door_time = c_time - 30 * DAY_SECONDS
    items = db_mongo.get_table('plat2', 'order').find({'order_create_time': {'$gt': door_time}})
    for item in items:
        print(item)


judge_24h()
