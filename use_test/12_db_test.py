import time

from pymongo import MongoClient

from common.libs import db_mongo


cache_client = {}


def get_client():
    key = 'mongo_client'
    if not cache_client.get(key):
        print('create client...')
        client = MongoClient('127.0.0.1', 27017)
        cache_client[key] = client
    return cache_client.get(key)


def get_db(db_name):
    key = "mongo_db_%s" % db_name
    if not cache_client.get(key):
        cache_client[key] = get_client().get_database(db_name)
    return cache_client.get(key)


def get_table(db_name, table_name):
    if db_name == 'plat2':
        db_name = 'plat2'
    key = "mongo_table_%s__%s" % (db_name, table_name)
    if not cache_client.get(key):
        cache_client[key] = get_db(db_name).get_collection(table_name)
    return cache_client.get(key)


def get_table(db_name, table_name):
    if db_name == 'plat2':
        db_name = 'plat2'
    key = "mongo_table_%s__%s" % (db_name, table_name)
    if not cache_client.get(key):
        cache_client[key] = get_db(db_name).get_collection(table_name)
    return cache_client.get(key)


tb = get_table('plat2', 'member')
tb = get_table('plat2', 'member')
tb = get_table('plat2', 'member')
tb = get_table('plat2', 'member')

