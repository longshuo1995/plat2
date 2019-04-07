import re
import requests
from lxml import etree
pattern_num = re.compile('\((\d*)\)')


def get_mall_info(good_id):
    url = 'https://mobile.yangkeduo.com/goods.html?goods_id=%s' % good_id
    html = requests.get(url, verify=False).text
    xhtml = etree.HTML(html)
    mall_name = xhtml.xpath("//div[@class='goods-mall-name']//text()")
    mall_name = mall_name[0] if mall_name else ''
    mall_icon = xhtml.xpath("//img[@class='goods-mall-tag']/@src")
    mall_icon = mall_icon[0] if mall_icon else ''
    dsr_content = xhtml.xpath("//div[@class='dsr-center']//text()")
    desc = []
    for i in range(0, len(dsr_content), 2):
        temp = (dsr_content[0], dsr_content[1])
        desc.append(temp)

    review_num_str = ''.join(xhtml.xpath("//div[@class='goods-reviews-num']//text()"))
    search_res = pattern_num.search(review_num_str)
    review_num = int(search_res.group(1)) if search_res else 0
    review_items = xhtml.xpath("//div[@class='reviews-item']")
    review_data = []
    for item in review_items:
        icon = item.xpath('./img/@src')
        nick_name = item.xpath('./span[@class="reviews-item-name"]//text()')
        review_content = item.xpath('./span[@class="reviews-item-content"]//text()')
        temp = {
            'user_icon': icon[0] if icon else '',
            'nick_name': nick_name[0] if icon else '',
            'review_content': review_content[0] if icon else '',
        }
        review_data.append(temp)

    resp = {
        'mall_name': mall_name,
        'mall_icon': mall_icon,
        'mall_desc': desc,
        'review': {
            'num': review_num,
            'data': review_data
        }
    }
    return resp


def get_reviews(good_id, page=1):
    url = 'https://mobile.yangkeduo.com/proxy/api/reviews/%s/list?page=%s&size=10&enable_video=0' % (good_id, page)
    jo = requests.get(url, verify=False).json()
    return jo


