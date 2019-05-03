import pandas as pd

from common.libs import db_mongo

items = db_mongo.get_table('plat2', 'member').find()
df = pd.DataFrame(items)
items = df['open_id'].sum()
for item in items.index:
    if int(items[item]) > 1:
        print(item)
        print(items[item])


