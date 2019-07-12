function batget ($http, tokenService) {
  return {

    /**
     * 获取产品库存
     * @param skuId 产品id
     * @param area 区域ID，以 ‘_‘连接，如'1_3_3_4'
     * @param number 产品数量
     */
    get: (skuId, area, number) => {
      return $http({
        method: 'GET',
        url: '/jd/api/stock/fororder/batget/one',
        params: { skuId, area, number},
        headers: tokenService.authorization
      }).then(res => res.data.bizStockFororderBatgetResults).catch(angular.noop);
    }
  }
}

batget.$inject = ['$http', 'token'];

export default {
  name: 'batget',
  service: batget
}