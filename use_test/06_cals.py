import glob
import os
fns = glob.glob('./*/kd_query_test_to_yl')

out_file = open('result.csv', 'w')
for fn in fns:
    items = fn.split('/')
    r = os.popen('wc -l %s' % fn)
    out_file.write('%s,%s\n' % (items[1], r.strip().split()[0]))
