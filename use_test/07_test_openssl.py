# coding:utf8
from flask import Blueprint, Flask

app = Flask(__name__)


# attention1: 原来是app.route('/')
@app.route('/test')
def index():
    return 'test....'


if __name__ == "__main__":
    app.run('0.0.0.0', debug=True, port=8885)
