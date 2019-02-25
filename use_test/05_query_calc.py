last = ['', '']
key_count = {}
for line in open("kd_query_test_to_yl"):
    items = line.split()
    if items[0] == last[0]:
        last[1] = items[2] if len(items[2]) > len(last[1]) else last[1]
    else:
        last[0] = items[0]
        key_count[last[1]] = key_count.get(last[1], 0) + 1
        last[1] = items[2]

key_count_l = [(k, v) for k, v in key_count.items()]
key_count_l.sort(key=lambda i: i[1], reverse=True)

out_file = open('key_count.csv', 'w')
for key_count in key_count_l:
    out_file.write('%s,%s\n' % key_count)

