import os

import project_conf

fn = os.path.join(project_conf.project_path, 'web', 'static', 'index_img')
l = os.listdir(fn)
print(l)

