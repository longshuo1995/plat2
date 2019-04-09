import json
import re

import requests
from lxml import etree

from common.libs.pdd import HttpTool

pattern_num = re.compile('\((\d*)\)')
pattern_detail = re.compile('window\.rawData.*?({.*});\n')


def get_mall_info(good_id):
    url = 'https://mobile.yangkeduo.com/goods.html?goods_id=%s' % good_id
    html = HttpTool.get_html(url, use_proxy=True)
    xhtml = etree.HTML(html)

    good_content = pattern_detail.search(html)
    if not good_content:
        mall_name = xhtml.xpath("//div[@class='goods-mall-name']//text()")
        mall_name = mall_name[0] if mall_name else ''
        mall_icon = xhtml.xpath("//img[@class='goods-mall-tag']/@src")
        mall_icon = mall_icon[0] if mall_icon else ''
        dsr_content = xhtml.xpath("//div[@class='dsr-center']//text()")
        with open('test.html', 'w') as f:
            f.write(html)
        desc = []
        for i in range(0, len(dsr_content), 2):
            temp = (dsr_content[0], dsr_content[1])
            desc.append(temp)

        review_num_str = ''.join(xhtml.xpath("//div[@class='goods-reviews-num']//text()"))
        search_res = pattern_num.search(review_num_str)
        review_num = int(search_res.group(1)) if search_res else 0
        review_items = xhtml.xpath("//div[@class='goods-reviews-list']/div")
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
    else:
        jo = json.loads(good_content.group(1))
        print(good_content.group(1))
        mall_desc = []
        for item in jo['store']['initDataObj']['mall']['dsr']['mallRatingTextList']:
            mall_desc.append([
                item['mall_rating_key']['txt'],
                # jo['store']['initDataObj']['mall']['dsr'].get('logisticsScore', ''),
                item['mall_rating_value']['txt'],
                item['mall_rating_value']['color'],
            ])
        mall_desc[0].insert(1, jo['store']['initDataObj']['mall']['dsr'].get('descScore', ''))
        mall_desc[1].insert(1, jo['store']['initDataObj']['mall']['dsr'].get('serviceScore', ''))
        mall_desc[2].insert(1, jo['store']['initDataObj']['mall']['dsr'].get('logisticsScore', ''))

        resp = {
            'mall_name': jo['store']['initDataObj']['mall']['mallName'],
            'mall_icon': jo['store']['initDataObj']['mall']['logo'],
            'mall_desc': mall_desc,
            'review': {
                'num': jo['store']['initDataObj']['reviews']['commentsAmount'],
                'data': jo['store']['initDataObj']['reviews']['detailList']
            }
        }
    return resp


def get_reviews(good_id, page=1):
    url = 'https://mobile.yangkeduo.com/proxy/api/reviews/%s/list?page=%s&size=10&enable_video=0' % (good_id, page)
    html = HttpTool.get_html(url, use_proxy=True)
    jo = json.loads(html)
    return jo


if __name__ == '__main__':
    headers = {
        'referer': 'https://servicewechat.com/wx676a09ae59553fda/73/page-frame.html',
    }
    url = 'https://apiv4.yangkeduo.com/reviews/5681711441?page=1&size=3'
    '''
    https://duoke678.com/pdd/goodDetail?goods_id=622626205&uid=0&pid=1000065_43001792&ranNum=RMbYaabYaYA&sign=9bd5ba6789365f3b4f3f4cc6f4350d4f
    '''
    for i in range(100):
        res = requests.get(url, headers=headers, verify=False, timeout=5).text
        print(res)
