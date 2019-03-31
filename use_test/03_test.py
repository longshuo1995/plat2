import json
import requests

access_token = '20_Njq0t6yYtUSOACxGzYzCTyQtzKc9OZ8gqUhMorm7lJwSYozL9Y6YSiSlODMeMVdeijM4KxOS6Y9t6oas1vX1V1Km5ii_g_s65tvlFaH5_570yk-lV6soBoqeRAZMt4EKRI1w4yGWy2Z5FoBBSHWhAJAODS'
url = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=%s' % access_token
headers = {
    "Content-Type": "application/json"
}
params = {
    # 'access_token': access_token,
    'scene': 'sss=1',
    'page': 'pages/index/index'
}

res = requests.post(url=url, json=params, verify=False).content
print(res)
