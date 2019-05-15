from common.libs import db_mongo
import pandas as pd

items = db_mongo.get_table('plat2', 'member').find()
db_mongo.get_table('plat3', 'member_0515').insert_many(items)
# df = pd.DataFrameitems)
# vc = df['open_id'].value_counts()
#
# tb2 = db_mongo.
# for index in vc.index:
#     if int(vc[index]) > 1:
#         items = db_mongo.get_table('plat2', 'member').find({'open_id': index})
#         # for i in items:
#         #     print(i['_id'])
#         # print('*'*10)
