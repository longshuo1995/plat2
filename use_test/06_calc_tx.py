from common.libs import db_mongo

items = db_mongo.get_table('plat2', 'order').find({"order_status": {'$in': [3, 5]}})
tb = db_mongo.get_table('plat2', 'member')
k_v = {}
for item in items:
    k_v[item['custom_parameters']] = float(k_v.get(item['custom_parameters'], 0)) + float(item['total_promotion']*0.5)
    k_v[item['refer_id']] = float(k_v.get(item['refer_id'], 0)) + float(item['total_promotion']*0.25)
    k_v[item['leader_openid']] = float(k_v.get(item['leader_openid'], 0)) + float(item['total_promotion']*0.25)

k_v_l = list(k_v.items())
k_v_l.sort(key=lambda i: i[1])
t_10 = 0
t = 0
for i in k_v_l:
    info = tb.find_one({'open_id': i[0]})
    if not info:
        continue
    print(info['nick_name'], round(i[1], 2))
    t += i[1]
    if i[1] >= 10:
        t_10 += i[1]
print(t)
print(t_10)

# df = pd.DataFrame(res)
# tot = df['total_promotion'].sum()
# print(tot)
