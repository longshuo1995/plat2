import os


def get_script_path(_file):
    return os.path.split(os.path.realpath(_file))[0]
