import re
import requests
from lxml import etree

pattern_place = re.compile('<dd>(.*?)<a')


def start_crawl(ip_addr):
    url = 'http://ip.tool.chinaz.com/%s' % ip_addr
    headers = {
       'cache-control': 'max-age=0',
       'upgrade-insecure-requests': '1',
       'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
       'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
       'accept-encoding': 'gzip, deflate, br',
       'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    }
    res = requests.get(url, headers=headers).text
    xhtml = etree.HTML(res)
    items = xhtml.xpath('//span[@class="Whwtdhalf w50-0"]/text()')
    if items:
        return items[-1]
    # for idx, item in enumerate(items):
    #     if item.find('来自') > 0:
    #         gp = pattern_place.search(items[idx+1])
    #         if gp:
    #             print(gp.group(1))
    return ''
