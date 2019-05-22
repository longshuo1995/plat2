import time

from jobs import update_order

tm = int(time.time())

start_tm = 1553697330
while start_tm < tm:
    time_interval = 24*60*60
    update_order.start_update_order(time_interval, start_tm, current_time=start_tm+time_interval, is_correct=True)
    start_tm += time_interval
    break
