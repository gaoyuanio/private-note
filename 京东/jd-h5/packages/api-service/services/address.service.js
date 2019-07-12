function address ($http, tokenService) {

    return {

        /**
         * 根据地区级别与id查询该区域下一级区域名称与id的映射表
         * @param grade String 查询的级别
         * @param id 父级区域id，grade===1时不需要传
         * @returns Promise<Object> 返回的map对象
         */
        get: (grade, id) => {
            return $http({
                method: 'GET',
                url: '/jd/api/get/jd/address',
                params: { grade, id, },
                headers: tokenService.authorization
            }).then(res => res.data.result).catch(angular.noop);
        },

        getName: (provinceId,cityId,countyId,townId) => {
            return $http({
                method: 'GET',
                url: '/jd/api/get/jd/address/name',
                params: { provinceId, cityId, countyId, townId },
                headers: tokenService.authorization
            }).then(res => res.data.name).catch(angular.noop);
        }
    };
}

address.$inject = ['$http', 'token'];

export default {
    name: 'address',
    service: address
}