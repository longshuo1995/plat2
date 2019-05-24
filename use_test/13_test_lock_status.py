from common.libs import db_mongo
from jobs import update_order


def lock_status():
    items = db_mongo.get_table('plat2', 'draw').find({'status': 0})
    for item in items:
        draw_count = item.get('draw_count', 0)
        open_id = item.get('open_id', '')
        # 加锁
        db_mongo.get_table('plat2', 'draw').update_one({'_id': item['_id']}, {'$set': {'status': 1}})
        if not open_id:
            print('not open id')
            continue
        # 冻结finance表
        info = db_mongo.get_table('plat2', 'finance').find_one({'open_id': open_id})
        print(info)
        if draw_count <= info.get('finance', 0):
            finance_remain = info.get('finance', 0) - draw_count
            checking = info.get('checking', 0) + draw_count
            db_mongo.get_table('plat2', 'finance').update_one({'open_id': open_id},
                                          {'$set': {'finance': finance_remain, 'checking': checking}})


if __name__ == '__main__':
    lock_status()
