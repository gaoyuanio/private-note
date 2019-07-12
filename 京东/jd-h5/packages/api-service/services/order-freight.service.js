function orderFreight ($http, tokenService) {
  return {
    /**
     * 获取运费
     * @param sku 产品id
     * @param province 省份id
     * @param city 城市id
     * @param county 市级id
     * @param town 区域id
     */
    get: (sku, province, city, county, town) => {
      return $http({
        method: 'POST',
        url: '/jd/api/getOrderFreightGet',
        headers: tokenService.authorization,
        data: {
          sku, province, city, county, town
        }
      }).then(res => res.data.result).catch(angular.noop);

    }
  };
}

orderFreight.$inject = ['$http', 'token'];

export default {
  name: 'orderFreight',
  service: orderFreight
}