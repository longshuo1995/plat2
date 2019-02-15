import pymysql


def get_mysql_conn(db_name):
    conn = pymysql.connect(host='localhost', user='root', passwd='1234',
                       db=db_name, port=3306)
    return conn


def select_from_tiku(sql, db_name):
    conn = get_mysql_conn(db_name)
    cur = conn.cursor()
    cur.execute(sql)
    res = cur.fetchall()
    cur.close()
    conn.close()
    return res


def insert2tiku(sql):
    conn = get_mysql_conn()
    cur = conn.cursor()
    cur.execute(sql)
    cur.close()
    conn.commit()
    conn.close()

