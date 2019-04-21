from common.libs import db_mongo


def back(row, back):
    items = db_mongo.get_table('plat2', row).find()
    db_mongo.get_table('plat2', back).insert(items)


back('member', 'member_back')
