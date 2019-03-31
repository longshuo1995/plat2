import requests

from application import app


def getWechatOpenId(code):
    url = 'https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={secret}&js_code={js_code}&grant_type' \
          '=authorization_code'.format(appid=app.config['MINA_APP']['appid'], js_code=code, secret=app.config['MINA_APP']['appkey'])
    jo = requests.get(url).json()
    return jo.get('openid', '')


def get_access_token():
    url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s' % \
              (app.config['MINA_APP']['appid'], app.config['MINA_APP']['appkey'])
    jo = requests.get(url).json()
    return jo['access_token']
