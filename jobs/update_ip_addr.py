from common.libs import db_mongo
from common.libs.tools import IpSpider

items = db_mongo.get_table('plat2', 'member').find({'ip': {'$exists': True}, 'ip_addr': {'$exists': False}})
for item in items:
    ip_addr = IpSpider.start_crawl(item['ip'])
    db_mongo.get_table('plat2', 'member').update({'_id': item['_id']}, {'$set': {'ip_addr': ip_addr}})

# ip_addr = IpSpider.start_crawl('113.222.185.197')
# print(ip_addr)
