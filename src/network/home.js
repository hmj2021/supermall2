/*首页的所有请求，方便管理，首页只需要调用*/

import {request} from "@/network/request";

export function getHomeMultiData() {
  return request({
    url:'/home/multidata'
  });
}
export function getHomeGoods(type, page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  });
}
