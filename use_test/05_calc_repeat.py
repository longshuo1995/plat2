import pandas as pd

from common.libs import db_mongo

items = db_mongo.get_table('plat2', 'member').find()
df = pd.DataFrame(items)
items = df.groupby('open_id').sum()
items = items.sort_values(ascending=False)
for item in items.index:
    print(item)
    print(items[item])


