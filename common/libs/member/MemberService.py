import requests

# from application import app
from config import base_setting


def getWechatOpenId(code):
    url = 'https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={secret}&js_code={js_code}&grant_type' \
          '=authorization_code'.format(appid=base_setting.MINA_APP['appid'], js_code=code, secret=base_setting.MINA_APP['appkey'])
    jo = requests.get(url).json()
    return jo.get('openid', '')


def get_access_token():
    url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s' % \
              (base_setting.MINA_APP['appid'], base_setting.MINA_APP['appkey'])
    jo = requests.get(url, verify=False).json()
    return jo['access_token']
