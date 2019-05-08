from common.libs.member import MemberService
from config import base_setting
from use_test.decry.WXBizDataCrypt import WXBizDataCrypt


def decry(session_key, encry_data, iv):
    pc = WXBizDataCrypt(base_setting.MINA_APP['appid'], session_key)
    return pc.decrypt(encry_data, iv).get('phoneNumber')


if __name__ == '__main__':
    code = '033nAtiU1dGt2Y02sJiU1c6CiU1nAtiv'
    encryptedData = "0opeS0j1OLVcSen9sRRttlyPNb1vYpOoa6OZLVZBjUU++sR7V1t1GvQ1vMB7S0gXjfm7IGKwwafV9tS54i3cmCIaE9NFnTfU/bxAuVEYDyKYg7vPaCoaed+JHOIP0Bp07hk26sEPFQl5Do4PNdBQfbOzJJQzuLDTJe80ng4GZEgSRoO/azs2vAqQqfp8A3ISYexqHbSzd7Em4bFs33g8xQ=="
    iv = "tDAKn77bUb4NIQymYfm25g=="
    res = MemberService.decry_phone_num(code, encryptedData, iv)
    print(res)
