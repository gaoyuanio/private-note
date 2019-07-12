function categories ($http, tokenService, $q) {
  
  let cached = {};

  return {


    getTopCategories: function () {
      return $http({
        method: 'GET',
        url: '/jd/api/get/zeroCategory',
        headers: tokenService.authorization
      }).then(res => (res.data.jdCategories))
    },
    getSubCategories: function (parentId) {

      var defer = $q.defer();

      if (cached[parentId]) {
        defer.resolve(cached[parentId]);
        return defer.promise;
      } else {
        return $http({
          method: 'GET',
          url: '/jd/api/get/category/children',
          params: { parentId },
          headers: tokenService.authorization
        }).then(res => {
          cached[parentId] = res.data.jdCategories;
          return res.data.jdCategories;
        });

      }

    }

  }
}

categories.$inject = ['$http', 'token', '$q'];

export default {
  name: 'categories',
  service: categories
}