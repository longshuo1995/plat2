import pandas as pd
a = [{'a': 1}, {'a': 2}]
df = pd.DataFrame(a)
for item in df:
    print(item)
