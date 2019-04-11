import hashlib
import os

import project_conf


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


def write_log(fn, msg):
    file_path = os.path.join(project_conf.project_path, 'log', fn)
    with open(file_path, 'a') as f:
        f.write(msg+'\n')


def null_convert(value, is_int=False):
    if is_int:
        return value if value else 0
    else:
        return value if value else ''
