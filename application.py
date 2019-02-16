import os
from flask import Flask
from flask_script import Manager
from common.libs.UrlManager import UrlManager


class Application(Flask):
    def __init__(self, import_name, template_folder=None, root_path=None, static_folder=None):
        super(Application, self).__init__(import_name, template_folder=template_folder, root_path=root_path,
                                          static_folder=static_folder)
        self.config.from_pyfile('config/base_setting.py')
        if "ops_config" in os.environ:
            self.config.from_pyfile('config/%s_setting.py' % os.environ['ops_config'])


app = Application(__name__, template_folder=os.getcwd()+'/web/templates', root_path=os.getcwd(), static_folder=None)
manager = Manager(app)

'''
函数模板, 可以在html中使用
'''
app.add_template_global(UrlManager.buildStaticUrl, 'buildStaticUrl')
app.add_template_global(UrlManager.buildUrl, 'buildUrl')

