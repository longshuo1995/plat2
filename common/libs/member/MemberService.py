import json

import requests

# from application import app
from config import base_setting
from use_test.decry.WXBizDataCrypt import WXBizDataCrypt


def getWechatOpenId(code, get_session_key=False):
    url = 'https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={secret}&js_code={js_code}&grant_type' \
          '=authorization_code'.format(appid=base_setting.MINA_APP['appid'], js_code=code, secret=base_setting.MINA_APP['appkey'])
    jo = requests.get(url).json()
    with open('test.json', 'w') as f:
        f.write(json.dumps(jo))
    return jo.get('session_key', '') if get_session_key else jo.get('openid', '')


def get_access_token():
    url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s' % \
              (base_setting.MINA_APP['appid'], base_setting.MINA_APP['appkey'])
    jo = requests.get(url, verify=False).json()
    return jo['access_token']


def decry_phone_num(code, encry_data, iv):
    session_key = getWechatOpenId(code, get_session_key=True)
    pc = WXBizDataCrypt(base_setting.MINA_APP['appid'], session_key)
    return pc.decrypt(encry_data, iv).get('phoneNumber')
