import os

from common.libs.tools import OsTool

project_path = OsTool.get_script_path(__file__)
assert_path = os.path.join(project_path, 'asserts')
rate_conf = {
    'self_rate': 0.5,
    'refer_rate': 0.25,
    'leader_rate': 0.25,
    'relation_rate': 0.05,
}

seconds_per_day = 24 * 60 * 60

qiyu_range_pg = [
    (7 * seconds_per_day, 'half_hour_range.json'),
    (30 * seconds_per_day, '2_hour_range.json'),
    (60 * seconds_per_day, '24_hour_range.json'),
]
fengyun_range_pg = {
    'self': {
        'member': 'self_member',
        'promotion': 'self_promotion'
    },
    'group': {
        'member': 'group_promotion',
        'promotion': 'group_promotion'
    },
}

allow_status = [1, 2, 3, 4]
