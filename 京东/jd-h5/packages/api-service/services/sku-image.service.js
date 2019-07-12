function skuImage ($http, tokenService) {

    return {
        /**
         * 根据商品id获取商品图片
         * @param skuId String 商品id
         * @returns Promise<String[]> 图片路径数组
         */
        get: (skuId) => {
            let token = tokenService;
            return $http({
                method: 'GET',
                url: '/jd/api/getImage?skuId=' + skuId,
                headers: tokenService.authorization 
            }).then(res => res.data.result[skuId]).catch(angular.noop);
        }
    }
}

skuImage.$inject = ['$http', 'token'];

export default {
    name: 'skuImage',
    service: skuImage
}