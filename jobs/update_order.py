import time

import project_conf
from common.libs import db_mongo
from common.libs.pdd import pdd_tools
from common.libs.tools import StrTools, ODTools


def start_update_order(time_interval=60, before_time=0, current_time=0, is_correct=False):
    # db.order.find({'order_status': {$in: [1, 2]}});
    if not current_time:
        current_time = (time.time() // time_interval) * time_interval
    if not before_time:
        before_time = current_time - (time_interval * 2)
    temp = {}
    for i in range(10):
        msg = 'update order exception'
        try:
            l = pdd_tools.order_search(int(before_time), int(current_time))
            temp = l.get('order_list_get_response', {})
        except Exception as e:
            msg = e
        if not temp:
            time.sleep(1)
            StrTools.write_log('error_update_order', '%s' % msg)
        else:
            StrTools.write_log('error_update_order', 'success...%s' % temp)
            break
    order_items = l.get('order_list_get_response', {}).get('order_list', [])
    tbl = db_mongo.get_table('plat2', 'order')
    for item in order_items:
        _id = item['order_sn']
        old_order = tbl.find_one({'_id': _id})
        if old_order and old_order.get('order_status') == 6:
            # 结s商品
            if not is_correct:
                continue
            open_id = item['custom_parameters']
            user_info = db_mongo.get_table('plat2', 'member').find_one({'open_id': open_id})
            if not user_info:
                user_info = {}

            upd = StrTools.filter_map(item)
            upd['order_status_desc'] = '审核通过'
            upd["refer_id"] = user_info.get('refer_id', '')
            upd["leader_openid"] = user_info.get("leader_openid", '')
            upd["leader_master"] = user_info.get("leader_master", '')
            upd["total_promotion"] = round(item['promotion_rate'] * item['order_amount'] / 100000, 2)

            upd['create_time'] = StrTools.convert_time(int(item['order_create_time']), '%Y-%m-%d %H:%M')

            tbl.update({'_id': item['order_sn']}, upd)
            continue
        if old_order:
            if old_order.get('order_status') != item['order_status']:
                # js判断
                if item['order_status'] in (3, 5, 6) and old_order.get('order_status') not in (3, 5, 6):
                    m_p = ODTools.get_promotion_msg([item])
                    item['order_status'] = 6
                    item['order_status_desc'] = '审核通过'
                    ODTools.upd_finance(m_p)
                tbl.update({'_id': item['_id']}, {'$set':
                {'order_status': item['order_status'], 'order_status_desc': item['order_status_desc']}})


        else:
            open_id = item['custom_parameters']
            user_info = db_mongo.get_table('plat2', 'member').find_one({'open_id': open_id})
            if not user_info:
                user_info = {}

            upd = StrTools.filter_map(item)
            master_rate = 0
            if user_info.get('leader_master'):
                master_rate = project_conf.rate_conf['leader_rate']
                if user_info['refer_id'] == user_info['leader_openid']:
                    master_rate += project_conf.rate_conf['refer_rate']
                if open_id == user_info['leader_openid']:
                    master_rate += project_conf.rate_conf['leader_rate']
                master_rate *= project_conf.rate_conf['relation_rate']

            upd["refer_id"] = user_info.get('refer_id', '')
            upd["leader_openid"] = user_info.get("leader_openid", '')
            upd["leader_master"] = user_info.get("leader_master", '')
            upd["total_promotion"] = round(item['promotion_rate'] * item['order_amount'] / 100000, 2)

            upd['master_promotion'] = round(master_rate * upd['total_promotion'], 2)

            upd['create_time'] = StrTools.convert_time(int(item['order_create_time']), '%Y-%m-%d %H:%M')

            # 查询是否有优惠购买记录 and 价格大于1元
            if upd['total_promotion'] >= 1:
                history = db_mongo.get_table('plat2', 'order').find_one({'custom_parameters': open_id, 'other_promotion': 1})
                if not history:
                    upd['other_promotion'] = 1

            tbl.insert_one(upd)


if __name__ == '__main__':
    start_update_order()

