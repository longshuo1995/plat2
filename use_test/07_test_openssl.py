# coding:utf8
# 创建一个子域名
from flask import Blueprint, Flask

app = Flask(__name__)


# attention1: 原来是app.route('/')
@app.route('/')
def index():
    return u'这个是api的首页'


if __name__ == "__main__":
    # attention2:你的以及域名，比如bbaidu.com
    # app.config['SERVER_NAME'] = 'aishangnet.club'
    app.run('0.0.0.0', debug=True, port=80, ssl_context=('1_aishangnet.club_bundle.crt', '2_aishangnet.club.key'))
