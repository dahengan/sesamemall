import { request } from "./request";

export function getDetail(iid) {
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}
export function getRecommend(){
    return request ({
        url:'/recommend',
    })
}

export class Goods {
    constructor(itemInfo, columns, services){
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.price = itemInfo.lowNowPrice; 
        this.oldPrice = itemInfo.oldPrice;
        this.discountDesc = itemInfo.discountDesc;
        this.lowNowPrice = itemInfo.lowNowPrice;
        this.columns = columns;
        this.services = services  
    }
}

export class Shop {
    constructor(shopInfo){
        this.shopLogo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.score = shopInfo.score;
        this.isBetter = shopInfo.isBetter;
        this.fans = shopInfo.fans;
        this.goodsCount = shopInfo.cGoods;
        this.cSells = shopInfo.cSells
    }
}

export class GoodsParams {
    constructor(info,rule){
        this.image = info.image ? info.image[0] : '';
        this.set = info.set;
        this.tables = rule.tables;
    }
}