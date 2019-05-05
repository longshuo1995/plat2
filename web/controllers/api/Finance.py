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
    draw_count = req.get('draw_count', 0)
    open_id = req.get('open_id', 0)
    resp = {'code': 200, 'msg': '成功', 'data': {}}
    if not draw_count:
        resp = {'code': 500, 'msg': '请输入正确提现金额', 'data': {}}
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
    total_promotion = round(sum([p1, p2, p3]), 2)
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
    df = DataFrame(infos)
    today_start_time = ((int(time.time()) // judge_ranking.DAY_SECONDS) * judge_ranking.DAY_SECONDS) - 28800
    infos_today = df[df['order_create_time'] > today_start_time]
    if infos:
        total_promotion = calc_self_promotion(df, open_id)
        today_money = calc_self_promotion(infos_today, open_id)
    else:
        total_promotion = 0
        today_money = 0
    data = {
        "current_money": 0,
        "checking_money": 0,
        "order_num": len(infos),
        "est_money": total_promotion,
        "today_money": today_money
    }
    resp['data'] = data
    return jsonify(resp)
