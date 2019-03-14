# coding:utf8
from flask import Blueprint, Flask

app = Flask(__name__)


# attention1: 原来是app.route('/')
@app.route('/')
def index():
    return u'这个是api的首页'


if __name__ == "__main__":
    # attention2:你的以及域名，比如bbaidu.com
    app.run('0.0.0.0', debug=True, port=8885)
