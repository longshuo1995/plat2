import time
from common.libs import db_mongo
items = db_mongo.get_table('plat2', 'member').find()
tb_od = db_mongo.get_table('plat2', 'member')
out_file = open('res.csv', 'w')
crawled = set()
for item in items:
    if item['refer_id'] == item['leader_openid']:
        continue
    od_o = tb_od.find_one({'custom_parameters': item['open_id']})
    if not od_o:
        continue
    time_stamp = item['create_time']
    stf = time.strftime('%Y%m%d', time.localtime(time_stamp))
    out_file.write('%s\n' % stf)
