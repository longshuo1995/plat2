from common.libs import db_mongo
from common.libs.pdd import pdd_tools


def update_db_by_order(order_sn):
    tb = db_mongo.get_table('plat2', 'order')
    new_res = pdd_tools.search_order_by_sn(order_sn)
    if not new_res.get('order_detail_response'):
        return 0
    upd = new_res.get('order_detail_response')
    upd['_id'] = order_sn
    row = tb.find_one({'_id': order_sn})
    open_id = upd['custom_parameters']
    user_info = db_mongo.get_table('plat2', 'member').find_one({'_id': open_id})
    upd["refer_id"] = user_info.get('refer_id', '')
    upd["leader_openid"] = user_info.get("leader_openid", '')
    upd["leader_master"] = user_info.get("leader_master", '')
    if row:
        tb.update({'_id': order_sn}, upd)
    else:
        tb.insert_one(upd)
