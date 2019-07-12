function wareReturn ($http, tokenService) {
  return {
    /**
     * 获取退货方式
     * @param jdOrderId 订单id
     * @param skuId 商品id
     */
    get: (jdOrderId, skuId) => {
      return $http({
        url: '/jd/api/afterSale/wareReturnTypeQuery',
        params: { jdOrderId, skuId },
        method: 'POST',
        headers: tokenService.authorization
      }).then(res => res.data).catch(angular.noop);
    }
  };
}

wareReturn.$inject = ['$http', 'token'];

export default {
  name: 'wareReturn',
  service: wareReturn
}