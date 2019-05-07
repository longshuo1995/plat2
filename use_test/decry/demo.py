from use_test.decry.WXBizDataCrypt import WXBizDataCrypt


def main():
    # appId = 'wx4f4bc4dec97d474b'
    # sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
    # encryptedData = 'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZMQmRzooG2xrDcvSnxIMXFufNstNGTyaGS9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+3hVbJSRgv+4lGOETKUQz6OYStslQ142dNCuabNPGBzlooOmB231qMM85d2/fV6ChevvXvQP8Hkue1poOFtnEtpyxVLW1zAo6/1Xx1COxFvrc2d7UL/lmHInNlxuacJXwu0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn/Hz7saL8xz+W//FRAUid1OksQaQx4CMs8LOddcQhULW4ucetDf96JcR3g0gfRK4PC7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns/8wR2SiRS7MNACwTyrGvt9ts8p12PKFdlqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYVoKlaRv85IfVunYzO0IKXsyl7JCUjCpoG20f0a04COwfneQAGGwd5oa+T8yO5hzuyDb/XcxxmK01EpqOyuxINew=='
    # iv = 'r7BXXKkLb8qrSNn05n0qiA=='

    appId = 'wxca37926201a188c4'
    sessionKey = '9vqAPkPNt7mHAcud1BX8Ew=='
    encryptedData = "039q2RdTyi+y1ldPz8KLGZTlREN3EbqmoAGL8Px0rJeQL52MWShNxpkc309EjGtDtSRN8z3dcNNtAVB5z6sw9+ulIYlvx02rucevahLaGPTqkmLyCF4pYm3FVedrnuDUb5Dpox9dlW75K48MiKPwzdgkFySuDPxGVJuaDNTINfWaovc8JzbS07bWIdK+WpMhcFClFj9x+GJOR590X64DOw=="
    iv = "SpdFl3nkbfsRtlpcjLBWSg=="

    pc = WXBizDataCrypt(appId, sessionKey)
    print(pc.decrypt(encryptedData, iv))


if __name__ == '__main__':
    main()
