function availableNum ($http, tokenService) {
    return {

        /**
         * 获取售后数量
         * @param orderId 订单id
         * @param skuId 商品id
         * @returns Promise<Number> 商品数量 
         */
        update: (orderId, skuId) => {
            return $http({
                method: 'POST',
                url: '/jd/api/afterSale/availableNumberQuery?jdOrderId=' + orderId + '&skuId=' + skuId,
                headers: tokenService.authorization
            }).then(res => res.data).catch(angular.noop);
        }
    }
}

availableNum.$inject = ['$http', 'token'];

export default {
    name: 'availableNumAfterSale',
    service: availableNum
}