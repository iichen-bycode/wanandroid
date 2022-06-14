import service from "../utils/request";

// 首页文章列表
export const article =(page:number,type:number = 0||1) => {
    return service({
        url:type===0?`/article/list/${page}/json`:`user_article/list/${page}/json`,
    });
}

// 收藏的文章；列表
export const collectArticles = (page:number) => {
    return service({
        url:'/lg/collect/list/0/json'
    })
}

// 登录
export const login = (data) => {
    return service({
        params:data,
        url:'user/login',
        method:'post'
    })
}

// 注销
export const loginOut = () => {
    return service({
        url:'/user/logout/json'
    })
}

// 个人积分排名
export const getUserRankLevel = () => {
    return service({
        url:'lg/coin/userinfo/json'
    })
}

// 热搜
export const getHotSearch = () => {
    return service({
        url:'hotkey/json'
    })
}

// 常用网站
export const getCommonNet = () => {
    return service({
        url:'friend/json'
    })
}


// 收藏文章
export const doCollectArticle = (id:number) => {
    return service({
        url:`lg/collect/${id}/json`,
        method:'post',
    })
}

// 文章列表取消收藏     0       // 我的收藏列表  取消收藏     1
export const doCancelCollect = (flag:number = 0||1,id:number ) => {
    return service({
        url:flag===0?`lg/uncollect_originId/${id}/json`:`lg/uncollect/${id}/json`,
        method:'post',
    })
}

// 我的收藏列表  取消收藏


// =========================================================================================================
// =========================================================================================================
// 广场列表数据
