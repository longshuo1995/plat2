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
    if row:
        tb.update({'_id': order_sn}, upd)
    else:
        tb.insert_one(upd)

'''
{ "_id" : "190324-270806221493150", "match_channel" : 5, "goods_price" : 980, "promotion_rate" : 200, "cps_sign" : "CC8475051_56582557_8ae0720545eb4a014ecb0f6f723c5e6f", "pid" : "8475051_56582557", "type" : 0, "order_status" : 1, "order_create_time" : 1553441247, "order_settle_time" : null, "order_verify_time" : null, "order_group_success_time" : 1553441249, "order_amount" : 880, "order_modify_at" : 1553441255, "auth_duo_id" : 0, "goods_name" : "欧式创意玻璃花瓶透明彩色竖棱水培工艺玻璃花瓶客厅装饰插花摆件", "batch_no" : "", "url_last_generate_time" : 1553441151, "point_time" : null, "goods_quantity" : 1, "goods_id" : NumberLong("6843594724"), "goods_thumbnail_url" : "http://t00img.yangkeduo.com/goods/images/2019-03-24/7a87d84d639d306fda81679bc60de4fb.jpeg", "order_receive_time" : null, "custom_parameters" : "longshuo", "promotion_amount" : 176, "order_pay_time" : 1553441249, "group_id" : NumberLong("708270806221493150"), "duo_coupon_amount" : 100, "return_status" : 0, "order_status_desc" : "已成团", "request_id" : "15535263831811402", "order_sn" : "190324-270806221493150", "zs_duo_id" : null }
'''