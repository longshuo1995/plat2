from common.libs import db_mongo


def back(row, back):
    items = db_mongo.get_table('plat2', row).find()
    db_mongo.get_table('plat2', back).insert(items)


back('member', 'member_back')

'''
db.member_back.find({leader_openid: {$ne: "ohl4g5cpaQ2bYaQe8esGz9xVbAxk"}, refer_id:  "ohl4g5cpaQ2bYaQe8esGz9xVbAxk"}).count()

db.member_back.update({refer_id: "ohl4g5cpaQ2bYaQe8esGz9xVbAxk"}, {$set: {leader_openid: "ohl4g5cpaQ2bYaQe8esGz9xVbAxk"}})
'''


