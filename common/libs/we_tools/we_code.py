import os
import requests
import project_conf
from common.libs.member import MemberService


def good_share(goods_id, _id):
    headers = {
        "Content-Type": "application/json"
    }
    file_path = os.path.join(project_conf.project_path, 'web', 'static', 'we_code', '%s_%s.jpg' % (goods_id, _id))
    img_url = 'https://aishangnet.club/static/we_code/%s_%s.jpg' % (goods_id, _id)
    if os.path.exists(file_path):
        return img_url
    access_token = MemberService.get_access_token()
    path = 'pages/food/info'
    url = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=%s" % access_token
    data = {
        'page': path,
        'scene': 'id=%s&m_id=%s' % (goods_id, _id)
    }
    content = requests.post(url, headers=headers, json=data, verify=False).content
    with open(file_path, 'wb') as f:
        f.write(content)
    return img_url