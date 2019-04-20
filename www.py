from application import app
from web.controllers.account.Account import route_account
from web.controllers.index import route_index
from web.controllers.static import route_static
from web.controllers.user.User import route_user
from web.controllers.api import route_api, Food, Member, Ranking, Order, Group, Finance
from web.controllers.good import route_good, EditGood
from web.controllers.admin import route_admin, member_group_page


app.register_blueprint(route_index, url_prefix='/')
app.register_blueprint(route_user, url_prefix='/user')
app.register_blueprint(route_account, url_prefix='/account')
app.register_blueprint(route_static, url_prefix='/static')
app.register_blueprint(route_api, url_prefix='/api')
app.register_blueprint(route_good, url_prefix='/good')
app.register_blueprint(route_admin, url_prefix='/admin')


'''
http://gw-api.pinduoduo.com/api/router?type=pdd.ddk.goods.promotion.url.generate&timestamp=1510855609&sign=A158E9FB6068BB6F2647BB33B80AA783&client_id=f71f13b170dad5a173bbe1bea43ecde2&access_token=ce0edad39252483b883762d28c916e2a9bf7b3b7&page_size=10&p_id=81_1812886&generate_short_url=true&goods_id_list=[10060234]&multi_group=true&generate_we_app=true
'''
