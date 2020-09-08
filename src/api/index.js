
import instance from "./config.js"

// 获取轮播图请求
export function getSwipeData(){
    return instance.get("/getlunbo");
}
// 获取推荐商品请求
export function getGoodsData(limit = 6){
    return instance.get(`/recommend?limit=${limit}`);
}
// 获取商品列表请求
export function getGoodsList(pageindex = 1){
    return instance.get(`getgoods?pageindex=${pageindex}`);
}

// 获取新闻列表请求
export function getNewsList(page=1,pagesize=10){
    return instance.get(`/getnewslist?page=${page}&pagesize=${pagesize}`);
}
// 获取新闻详情数据
export function getNewsData(newid){
    return instance.get(`/getnew/${newid}`);
}
// 获取评论
export function getCommentList(id,pageindex = 1){
    return instance.get(`/getcomments/${id}?pageindex=${pageindex}`);
}
// 提交评论信息
export function addCommentData(id,comment){
    return instance.post(`/postcomment/${id}`,comment);
}
// 获取商品详情轮播
export function getThumbimages(id){
    return instance.get(`/getthumbimages/${id}`)
}
// 获取商品详情数据
export function getGoodsInfo(id){
    return instance.get(`/getgoodsinfo/${id}`)
}
//  图片分享的分类数据
export function getCateGory(){
    return instance.get(`/getcategory`)
}
//获取分类的数据
export function getCateData(id){
    return instance.get(`/getcatelist/${id}`)
}
// 获取取图片详情中的缩略图
export function getThum(id){
    return instance.get(`/getthumbimages/${id}`)
}
// 获取购物车商品数据
export function getShopCarList(ids){
    return instance.get(`/getshopcarlist/${ids}`)
}

//用户登录
export function getLogin(data){
    return instance.post(`/login`,data)
}

// 判断token是否存在
export async function isToken(){
    var token = localStorage.getItem("token");
    // if(!token){
    //     return
    // }
    try{
        await instance.post(`/checktoken?token=${token}`);
    }catch(e){

    }
}
// 注册用户
export function registerUser(data){
    return instance.post("/register",data)
}
// 获取用户的收货地址
export function getAddress(userId){
    return instance.get(`/getaddress/${userId}?v=${Math.random()}`)
}
// 用户添加收货地址
export function addAddress(userId,address){
    return instance.post(`/addaddress/${userId}`,address)
}
// 用户删除收货地址
export function deleteAddress(addressId){
    return instance.post(`/deladdress/${addressId}`)
}
// 用户编辑收货地址
export function updateAddress(addressId,address){
    return instance.post(`/updateaddress/${addressId}`,address)
}
