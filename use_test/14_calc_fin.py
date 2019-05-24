from common.libs import db_mongo
#
items = db_mongo.get_table('plat2', 'order').find({'order_status': 6})
c = 0
for i in items:
    c += i['total_promotion']
print('最新 所有 o 6', c)


#
items = db_mongo.get_table('plat2_bak', 'order').find({'order_status': 6})
c1 = 0
for i in items:
    c1 += i['total_promotion']
print('备份 o 6', c1)

print('order 差', c - c1)
#
#
items = db_mongo.get_table('plat2', 'finance').find()
f = 0
for i in items:
    f += i['finance']
    f += i.get('checking', 0)
    # if i.get('checking', 0):
    #     print('checking..', i.get('checking', 0))
print('最新 fn ', f)

items = db_mongo.get_table('plat2_bak', 'finance').find()
f1 = 0
for i in items:
    f += i['finance']
    f += i.get('checking', 0)
print('备份 fn', f1)
print('finance差', f - f1)


