import {request} from "@/network/request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid,
    }
  })
}

export function  getRecommend() {
  return request({
    url: '/recommend'
  })
}

  export class Goods {
    constructor(itemInfo,columns,services) {
      //构造一个类，将服务器中的数据赋值给对应的属性，总和成一个对象。
      this.title = itemInfo.title
      this.desc= itemInfo.desc
      this.newPrice = itemInfo.price
      this.oldPrice = itemInfo.oldPrice
      this.discount = itemInfo.discountDesc
      this.columns = columns
      this.services = services
      this.realPrice= itemInfo.lowNowPrice
    }
  }

  export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
  }

  export class GoodsParam {
  constructor(info,rule) {
  //  参数栏：  images可能没有值（某些商品没有值）
    this.image = info.image ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
  }
