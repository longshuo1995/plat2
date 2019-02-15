import json

from flask import Flask


app = Flask(__name__)


@app.route('/dema/list')
def get_data():
    app.logger.warn('warn....')
    app.logger.debug('debug....')
    data = {
        'arealist': [
            {
                'areaId': 1,
                'areaName': "西苑",
                'priority': 1,
            },
            {
                'areaId': 1,
                'areaName': "北苑",
                'priority': 1,
            }

        ]
    }
    return json.dumps(data)


@app.errorhandler(404)
def pg_not_found(error):
    app.logger.error(str(error))
    return "这个页面找不到呀。。。"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8082, debug=True)
