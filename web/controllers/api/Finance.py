import time

from flask import request, jsonify
from pandas import DataFrame

import project_conf
from common.libs import db_mongo
from jobs import judge_ranking
from web.controllers.api import route_api


@route_api.route('/finance/draw', methods=['GET', 'POST'])
def finance_draw():
    req = request.values
    draw_count = float(req.get('draw_count', 0))
    open_id = req.get('open_id', 0)
    upd = {
        'open_id': open_id,
        'draw_count': draw_count,
        'status': 0
    }
    db_mongo.get_table('plat2', 'draw').insert_one(upd)
    resp = {'code': 200, 'msg': '成功', 'data': {}}
    if draw_count < 10:
        resp = {'code': 500, 'msg': '请输入正确提现金额', 'data': {}}
        return jsonify(resp)
    if not draw_count:
        resp = {'code': 500, 'msg': '请输入正确提现金额', 'data': {}}
        return jsonify(resp)
    if not open_id:
        resp = {'code': 500, 'msg': '请传入open_id', 'data': {}}
    return jsonify(resp)


def calc_self_promotion(df, open_id):
    # self
    p1 = df[df['custom_parameters'] == open_id]['total_promotion'].sum() * project_conf.rate_conf['self_rate']
    # 老师
    p2 = df[df['refer_id'] == open_id]['total_promotion'].sum() * project_conf.rate_conf['refer_rate']
    # 团长
    p3 = df[df['leader_openid'] == open_id]['total_promotion'].sum() * project_conf.rate_conf['leader_rate']
    # 额外奖金
    try:
        other_promotion = df[df['leader_openid'] == open_id][df['other_promotion'] == 1]['other_promotion'].sum()
    except:
        other_promotion = 0
    total_promotion = round(sum([p1, p2, p3, other_promotion]), 2)
    return total_promotion


@route_api.route('/member/finance', methods=['GET', 'POST'])
def member_finance():
    req = request.values
    resp = {'code': 200, 'msg': '成功', 'data': {}}
    open_id = req.get('openid')
    if not open_id:
        resp = {'code': 401, 'msg': '请传入参数openid', 'data': {}}
        return jsonify(resp)
    # info =
    infos = list(db_mongo.get_table('plat2', 'order').find(
        {
            'order_status': {'$ne': 4},
            '$or': [{'custom_parameters': open_id}, {'refer_id': open_id},
                    {'leader_openid': open_id}, {'leader_master': open_id}]
        }))
    # 计算佣金
    if infos:
        df = DataFrame(infos)
        # today_start_time = ((int(time.time()) // (judge_ranking.DAY_SECONDS)) * judge_ranking.DAY_SECONDS) - 28800
        now_time = int(time.time())
        today_start_time = now_time - now_time % 86400 + time.timezone
        infos_today = df[df['order_create_time'] > today_start_time]
        total_promotion_df = df[df['order_status'] != 6]
        total_promotion = calc_self_promotion(total_promotion_df, open_id)
        today_money = calc_self_promotion(infos_today, open_id)
    else:
        total_promotion = 0
        today_money = 0
    finance_info = db_mongo.get_table('plat2', 'finance').find_one({'open_id': open_id})
    if not finance_info:
        finance_info = {}
    data = {
        "current_money": finance_info.get('finance', 0),
        "checking_money": finance_info.get('checking', 0),
        "order_num": len(infos),
        "est_money": total_promotion,
        "today_money": today_money
    }
    resp['data'] = data
    return jsonify(resp)
