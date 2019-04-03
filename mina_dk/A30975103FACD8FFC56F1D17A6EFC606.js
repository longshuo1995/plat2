var e = getApp(), d = e.globalData.url, o = e.globalData.pic_url, t = {
    system: {
        login: d + "/pdd/login/userLogin",
        addSourcePid: d + "/pdd/config/add_source_pid",
        invitedPrivacy: d + "/pdd/sys/privacy",
        reguser: d + "/pdd/user/regmobile",
        getRegWeekMoney: d + "/pdd/config/getRegWeekMoney",
        shareGoodsCount: d + "/goods/shareGoodsCount",
        goodDetail: d + "/pdd/goodDetail",
        getPddMinAppParam: d + "/pdd/config/getPddMinAppParamNew",
        buyLog: d + "/pdd/log/addUrlLog",
        isCollection: d + "/goods/isCollection",
        addCollection: d + "/goods/addCollectionGoods",
        delCollection: d + "/goods/delCollectionGoods",
        weAppPicUrl: d + "/pdd/weAppPicUrl",
        getShortUrl: d + "/pdd/getShortUrl",
        getActivityTopic: d + "/pdd/getActivityTopic",
        hotPoster: d + "/goods/hotPoster"
    },
    home: {
        index: {
            getMenu: d + "/pdd/config/getMenuListById",
            getBannerList: d + "/pdd/config/getBannerList",
            getGoodsList: d + "/pdd/goodListNew2",
            getNav: d + "/button/buttonList",
            getShareText: d + "/pdd/config/getShareRegContent",
            getExtensionGoods: d + "/goods/getExtensionGoods"
        },
        tutorial: {
            getSchool: d + "/pdd/sys/getSchool",
            getSchoolDetail: d + "/pdd/sys/getSchoolDetail"
        },
        coupon: {
            getSuperCouponGoods: d + "/pdd/getSuperCouponGoods"
        },
        news: {
            haveRead: d + "/pdd/sys/haveRead",
            getMessageBox: d + "/pdd/sys/getMessageBox",
            notice: d + "/pdd/sys/notice",
            freeNotice: d + "/order/freeNotice",
            read: d + "/pdd/sys/read"
        },
        thematicActivities: {
            topGoodsRate: d + "/goods/topGoodsRate",
            recommendGoods: d + "/pdd/recommendGoods",
            getWarmHeartGoodsList: d + "/pdd/getWarmHeartGoodsList"
        },
        themeBuy: {
            themeList: d + "/pdd/goodsTheme",
            themeGoods: d + "/pdd/theme_search"
        },
        store: {
            merchantList: d + "/pdd/merchantList2",
            mallGoodsList: d + "/pdd/mallGoodsList",
            mallUrlGen: d + "/pdd/mallUrlGen",
            mallCode: o + "/pdd/mall"
        },
        search: {
            hotSearch: d + "/pdd/hotSearch"
        },
        recommend: {
            getTopGoodsOptList: d + "/pdd/getTopGoodsOptList"
        },
        headLine: {
            getDkNews: d + "/pdd/config/getHeadlinesList",
            getHeadlinesDetail: d + "/pdd/config/getHeadlinesDetail"
        },
        orderRank: {
            rank: d + "/pdd/config/rank"
        },
        freeEvents: {
            activitFreeGoodsGecord: d + "/goods/activitFreeGoodsGecord",
            activitFreeGoodsGecordDetail: d + "/goods/activitFreeGoodsGecordDetail"
        }
    },
    find: {
        index: {
            getDKGoodsStoreByType: d + "/pdd/config/getDKGoodsStoreByType",
            findRecommendGoods: d + "/pdd/config/findRecommendGoods",
            getFinds: d + "/find/getFinds",
            findLike: d + "/find/findLike",
            downRank: d + "/pdd/config/downRank",
            getDKSharePicByType: d + "/pdd/config/getDKSharePicByType",
            findDelete: d + "/find/findDelete",
            createCopywriting: d + "/copywriting/createCopywriting",
            getFindRead: d + "/pdd/config/getFindRead"
        },
        publish: {
            saveFind: d + "/find/saveFind"
        },
        selectGoods: {
            findOrders: d + "/find/findOrders",
            verifyGoods: d + "/find/verifyGoods"
        }
    },
    vip: {
        monthData: d + "/userMember/monthData",
        teamOrderTop: d + "/userMember/teamOrderTop",
        teamContributionIncome: d + "/userMember/teamContributionIncome",
        teamUserNumberTop: d + "/userMember/teamUserNumberTop",
        getUplevelpParam: d + "/pdd/usercenter/getUplevelpParam",
        uplevel: d + "/pdd/usercenter/uplevel",
        weDkBossTop10: d + "/userMember/weDkBossTop10",
        userVideo: d + "/userMember/userVideo"
    },
    ranking: {
        pddTopGoods: d + "/pdd/pddTopGoods",
        rankGoodsList: d + "/goods/RankGoodsList"
    },
    mine: {
        index: {
            accountInfo: d + "/pdd/usercenter/index",
            recommendGood: d + "/pdd/cut/recommendGood",
            allowWithdrawal: d + "/pdd/usercenter/allowWithdrawal"
        },
        order: {
            orderList: d + "/pdd/usercenter/goodOrder",
            orderDetail: d + "/pdd/usercenter/getOrderDetal"
        },
        earnings: {
            earnings: d + "/pdd/usercenter/earning"
        },
        team: {
            setWxId: d + "/pdd/login/updateWxId",
            groupNumbers: d + "/pdd/usercenter/team_numbers",
            teamList: d + "/pdd/usercenter/team_detail",
            teamSearch: d + "/pdd/usercenter/team_search",
            teamDzkDetail: d + "/pdd/usercenter/team_dzk_detail",
            getTeamCount: d + "/pdd/usercenter/getTeamCount",
            getRelTeamExpectMoney: d + "/pdd/usercenter/getRelTeamExpectMoney"
        },
        inviteShare: {
            getShareText: d + "/pdd/config/getShareRegContent",
            getSwiperList: d + "/pdd/usercenter/templateList",
            generateImg: o + "/pdd/usercenter/generateImg",
            generatePromotionImg: o + "/pdd/usercenter/generateUserImg"
        },
        favorite: {
            collectionGoodsList: d + "/goods/CollectionGoodsList",
            delCollectionGoods: d + "/goods/delCollectionGoods"
        },
        exchange: {
            getFreeOrderList: d + "/order/getFreeOrderList",
            selectFreeOrder: d + "/order/selectFreeOrder",
            freeOrder: d + "/order/freeOrder",
            orderSubsidyList: d + "/order/getOrderSubsidyList",
            orderSubsidy: d + "/order/orderSubsidy"
        },
        withdrawal: {
            configContentList: d + "/pdd/config/contentById",
            getMoney: d + "/pdd/usercenter/getUserMoney",
            userDrawash: d + "/pdd/bank/withdrawal",
            cashDetail: d + "/pdd/bank/cashDetail"
        },
        settings: {
            refreshUser: d + "/pdd/login/refreshUser"
        }
    }
};

module.exports = t;