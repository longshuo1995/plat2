import time

from common.libs.pdd import pdd_tools

m5 = 5 * 60
current_time = (time.time() // m5) * m5
before_time = current_time - m5
l = pdd_tools.order_search(int(before_time), int(current_time))
print(l)

