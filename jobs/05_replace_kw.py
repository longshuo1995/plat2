from common.libs import db_mongo

items = db_mongo.get_table('plat2', 'find_goods').find()
for item in items:
    if item['desc'].find('多客') > -1:
        print(item['desc'])
        item['desc'] = item['desc'].replace('多客', '奇遇')
        db_mongo.get_table('plat2', 'find_goods').update(
            {'_id': item['_id']}, {'$set': {'desc': item['desc']}})
