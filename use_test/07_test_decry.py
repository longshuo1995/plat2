from common.libs.member import MemberService
from config import base_setting
from use_test.decry.WXBizDataCrypt import WXBizDataCrypt


def decry(session_key, encry_data, iv):
    pc = WXBizDataCrypt(base_setting.MINA_APP['appid'], session_key)
    return pc.decrypt(encry_data, iv).get('phoneNumber')


if __name__ == '__main__':

    sessionKey = '9vqAPkPNt7mHAcud1BX8Ew=='
    encryptedData = "039q2RdTyi+y1ldPz8KLGZTlREN3EbqmoAGL8Px0rJeQL52MWShNxpkc309EjGtDtSRN8z3dcNNtAVB5z6sw9+ulIYlvx02rucevahLaGPTqkmLyCF4pYm3FVedrnuDUb5Dpox9dlW75K48MiKPwzdgkFySuDPxGVJuaDNTINfWaovc8JzbS07bWIdK+WpMhcFClFj9x+GJOR590X64DOw=="
    iv = "SpdFl3nkbfsRtlpcjLBWSg=="
    res = decry(sessionKey, encryptedData, iv)
    print(res)
