from common.libs import db_mongo
import pandas as pd

items = db_mongo.get_table('plat2', 'member').find()
df = pd.DataFrame(items)
vc = df['open_id'].value_counts()
for index in vc.index:
    if int(vc[index]) > 1:
        items = db_mongo.get_table('plat2', 'member').find({'open_id': index})
        # for i in items:
        #     print(i['_id'])
        # print('*'*10)
