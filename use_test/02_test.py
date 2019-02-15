import json

import requests

from config import base_setting


def get_access_token():
    url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s' % \
          (base_setting.MINA_APP['appid'], base_setting.MINA_APP['appkey'])

    r = requests.get(url).text
    print(r)


def get_scene():
    access_token = '18_ANjgouyBRXyjQbW8Byi6PslSekhA6jnbpvSEfbFXu8jMA6TJSFSD5OybB-78YRzCMR7PkjZOX2ioeQG1S2qmEsbzwD4I-l_vXU79YQxt5bnK6a-0qd0Jd1qkB82iiRJKAUsTtSHvocekHzvtWFVgAJABKA'
    url = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=%s' % access_token
    headers = {'Content-Type': 'application/json'}
    data = {
        'access_token': access_token,
        'scene': 'hahxxxa',
        'path': 'pages/food/index'
    }
    print(url)
    t = requests.post(url, headers=headers, data=data).text
    print(t)

get_scene()