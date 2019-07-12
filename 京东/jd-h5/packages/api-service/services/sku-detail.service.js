function skuDetail ($http, tokenService) {
  return {
    /**
     * 获取产品信息
     * @param skuId 商品id
     */
    get: (skuId) => {
      return $http({
        method: 'GET',
        url: '/jd/api/getSkuDetail',
        params: { skuId },
        headers: tokenService.authorization 
      }).then(res => res.data).catch(angular.noop);
    }
  };
}

skuDetail.$inject = ['$http', 'token'];

export default {
  name: 'skuDetail',
  service: skuDetail
}