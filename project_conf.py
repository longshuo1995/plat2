from common.libs.tools import OsTool

project_path = OsTool.get_script_path(__file__)
rate_conf = {
    'self_rate': 0.5,
    'refer_rate': 0.25,
    'leader_rate': 0.25,
    'relation_rate': 0.05,
}
