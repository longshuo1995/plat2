class UrlManager:
    @staticmethod
    def buildUrl(path):
        return path

    @staticmethod
    def buildStaticUrl(path):
        path = '/static' + path + "?ver=%s" % 2011
        return UrlManager.buildUrl(path)
