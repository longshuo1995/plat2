import hashlib
import os
import time

import project_conf


def get_md5(source):
    m = hashlib.md5()
    m.update(source.encode(encoding='UTF-8'))
    return m.hexdigest().upper()


def add_value(m, key, value):
    m.setdefault(key, 0)
    m[key] = m[key] + value


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


def convert_time(timestamp, fmt):
    if not timestamp or timestamp < 10000:
        timestamp = int(time.time())
    st = time.localtime(timestamp)
    return time.strftime(fmt, st)


def reconvert_time(sst, fmt):
    time_array = time.strptime(sst, fmt)
    timestamp = int(time.mktime(time_array))
    return timestamp


if __name__ == '__main__':
    a = {'a': 3, 'b': 1}
    add_value(a, 'c', 10)
    add_value(a, 'a', 4)
    print(a)
