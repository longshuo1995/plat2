import hashlib
import base64
import random


class UserService:
    @staticmethod
    def genPwd(pwd, salt):
        m = hashlib.md5()
        _str = '%s-%s' % (
            base64.encodebytes(pwd.encode('utf-8')), salt
        )
        m.update(_str.encode('utf-8'))
        return m.hexdigest()

    @staticmethod
    def genSalt(length=16):
        sample = [chr(i) for i in range(65, 91)]
        keylist = [random.choice(sample) for _ in range(length)]
        return ''.join(keylist)


if __name__ == '__main__':
    r = UserService.genPwd('aishangmiandan', 'cF3JfH5FJfQ8B2Ba')
    print(r)
