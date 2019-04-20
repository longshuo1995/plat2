from flask_script import Server
import www
import logging
from application import app, manager

logging.basicConfig(level=logging.DEBUG, filename='/data/www/Order/log/run_log.log',
                    filemode='a', format='%(asctime)s~%(pathname)s~%(lineno)d~%(levelname)s~%(message)s')

manager.add_command("runserver", Server(host="0.0.0.0", port=app.config['SERVER_PORT'], use_debugger=app.config['DEBUG']))


def main():
    app.logger.error(app.config['SERVER_PORT'])
    # manager.run()
    app.run(host="0.0.0.0", port=8812, use_debugger=app.config['DEBUG'])


if __name__ == '__main__':
    try:
        import sys
        sys.exit(main())
    except Exception as e:
        import traceback
        traceback.print_exc()
