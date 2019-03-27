import hashlib


def get_md5(source):
    m = hashlib.md5()
    m.update(source.encode(encoding='UTF-8'))
    return m.hexdigest().upper()


def filter_map(m):
    resp = {}
    for key in m.keys():
        if m[key]:
            resp[key] = m[key]
    return resp
