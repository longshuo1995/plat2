d = { 'match_channel': 5, 'goods_price': 980, 'promotion_rate': 200, 'cps_sign': 'CC8475051_56582557_8ae0720545eb4a014ecb0f6f723c5e6f', 'pid': '8475051_56582557', 'type': 0, 'order_status': 1, 'order_create_time': 1553441247, 'order_settle_time': None, 'order_verify_time': None, 'order_group_success_time': 1553441249, 'order_amount': 880, 'order_modify_at': 1553441255, 'auth_duo_id': 0, 'goods_name': 'gn....', 'batch_no': '', 'url_last_generate_time': 1553441151, 'point_time': None, 'goods_quantity': 1, 'goods_id': 6843594724, 'goods_thumbnail_url': 'http://t00img.yangkeduo.com/goods/images/2019-03-24/7a87d84d639d306fda81679bc60de4fb.jpeg', 'order_receive_time': None, 'custom_parameters': 'longshuo', 'promotion_amount': 176, 'order_pay_time': 1553441249, 'group_id': 708270806221493150, 'duo_coupon_amount': 100, 'return_status': 0, 'order_status_desc': '....', 'request_id': '15535263831811402', 'order_sn': '190324-270806221493150', 'zs_duo_id': None }

for k in [i for i in d.keys()]:
    if not d[k]:
        d.pop(k)
d['_id'] = d['order_sn']
print(d)