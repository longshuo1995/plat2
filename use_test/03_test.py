import requests

from common.libs.member import MemberService


def good_share(open_id):
    headers = {
        "Content-Type": "application/json"
    }
    access_token = MemberService.get_access_token()
    print(access_token)
    path = 'pages/index/index?from_openid=%s' % open_id
    url = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=%s" % access_token
    data = {
        'scene': 'from_openid=1'
    }
    content = requests.post(url, headers=headers, json=data).content
    with open('艾艾.jpg', 'wb') as f:
        print(content)
        f.write(content)


open_id = 'ohl4g5aJa1RVoZzZl7lAohgKXNT8'
good_share(open_id)



