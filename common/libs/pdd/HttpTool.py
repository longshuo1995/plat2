import copy
import json

import requests
import hashlib
import time
import os

from lxml import etree



from common.libs import constant

proxy_site = {
    'http': 'http://s1.proxy.mayidaili.com:8123',
    'https': 'http://s1.proxy.mayidaili.com:8123'
}
proxy_key = '154329968'
proxy_secret = '5a5d21171a9cb6e67feb283b7625b412'

headers = {
   'Connection': 'close',
   'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
}


def get_html(url, method=constant.GET, headers=headers, data={}, use_proxy=False, ret_content=True):
    proxies = None

    if use_proxy:
        proxies = proxy_site
    for i in range(10):
        try:
            if use_proxy:
                headers['Proxy-Authorization'] = get_auth_header()
            if method == constant.GET:
                response = requests.get(url, headers=headers, data=data, proxies=proxies, timeout=15, verify=False)
            else:
                response = requests.post(url, headers=headers, data=data, proxies=proxies, timeout=15)
            if len(response.content) == 0:
                print("len is 0...")
                if use_proxy:
                    time.sleep(0.1)
                continue
            try:
                html = response.content.decode('utf-8')
            except:
                try:
                    html = response.content.decode('gbk')
                except:
                    html = response.text
            return html
        except Exception as e:
            print(e)
            # StrTool.log(constant.HTTP_ERROR, 'error while send requests')
            # StrTool.log(constant.HTTP_ERROR, str(e))
            pass
    return b''


def get_xhtml(url, method=constant.GET, headers=headers, data={}, use_proxy=False):
    html = get_html(url, method, headers, data, use_proxy)
    if not html:
        return ''
    xhtml = etree.HTML(html)
    return xhtml


def get_auth_header():
    paramMap = {
        'app_key': proxy_key,
        'timestamp': time.strftime("%Y-%m-%d %H:%M:%S")
    }
    keys = [k for k in paramMap.keys()]
    keys.sort()
    codes = "%s%s%s" % (proxy_secret, str().join('%s%s' % (key, paramMap[key]) for key in keys), proxy_secret)
    sign = hashlib.md5(codes.encode('utf-8')).hexdigest().upper()
    paramMap["sign"] = sign
    keys = paramMap.keys()
    authHeader = "MYH-AUTH-MD5 " + str('&').join('%s=%s' % (key, paramMap[key]) for key in keys)
    return authHeader


def get_content(url, method=constant.GET, headers=headers, data={}, use_proxy=False):
    proxies = None
    if use_proxy:
        proxies = proxy_site
    for i in range(10):
        try:
            if use_proxy:
                headers['Proxy-Authorization'] = get_auth_header()
            if method == constant.GET:
                content = requests.get(url, headers=headers, data=data, proxies=proxies, timeout=15).content
            else:
                content = requests.post(url, headers=headers, data=data, proxies=proxies, timeout=15).content
            if len(content) == 0:
                print("len is 0...")
                if use_proxy:
                    time.sleep(0.1)
                continue
            return content
        except Exception as e:
            print(e)
            # StrTool.log(constant.HTTP_ERROR, 'error while send requests')
            # StrTool.log(constant.HTTP_ERROR, str(e))
            pass
    return b''



