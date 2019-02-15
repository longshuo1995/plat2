'''
pip3 install mysqlclient
pip3 install flask_sqlalchemy
'''
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:1234@127.0.0.1/plat2"
db = SQLAlchemy(app)


@app.route('/api/hello')
def hello():
    from sqlalchemy import text
    sql = text('select * from test')
    result = db.engine.execute(sql)
    for row in result:
        app.logger.info(row)
    return "hello world"


@app.errorhandler(404)
def page_not_found(error):
    app.logger.error(error)
