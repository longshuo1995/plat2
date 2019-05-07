from common.libs.member import MemberService


def decry(encry_data, iv):
    pass


if __name__ == '__main__':
    encry_data = "LKNQ8jmeDHP098WV7rudjyyWzWBEUFhwh2wYfBxIuHPy2kEDO83YvsbTi6u5QcTL4zVpfjwt5eCY8duajx5n2I7VYP28f3zCbRRzV3pBoEMs2ayV3pJgnOJwGe8w890wQR2ZEjvF/djpNDWq6LVM2xFfSt7P2WbjHgJL/6D3PyAYgQ8CjiQDczt2DkNePnUeMbVoNO9ybY2D7JOwRbN8lg=="
    iv = "KFvmwlWeH4z5bKXHt4yI+A=="
    code = "033wpnYD1PbjO50fT6VD1XqkYD1wpnY-"
    MemberService.getWechatOpenId(code)