import requests

from common.libs.member import MemberService


def good_share(open_id):
    headers = {
        "Content-Type": "application/json"
    }
    access_token = MemberService.get_access_token()
    print(access_token)
    path = 'pages/food/index'
    url = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=%s" % access_token
    data = {
        'page': path,
        'scene': 'from_openid=111'
    }
    content = requests.post(url, headers=headers, json=data, verify=False).content
    with open('from_1.jpg', 'wb') as f:
        print(content)
        f.write(content)


open_id = 'ohl4g5aJa1RVoZzZl7lAohgKXNT8'
good_share(open_id)



