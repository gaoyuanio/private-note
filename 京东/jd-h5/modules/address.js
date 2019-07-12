var globalAddressFn = {
  request: function (grade, id) {
    var token = localStorage.getItem('lastname');
    var url = '/jd/api/get/jd/address?grade=' + grade;
    id && (url += '&id=' + id);
    var result;
    $.ajax({
      async: false,
      url: url,
      type: 'GET',
      headers: {
        "authorization": "Bearer " + token
      },
      success: function (res) {
        result = res;
      }
    });
    return result;
  },

  getProvinces: function () {
    return this.request(1);
  },

  getCities: function (cityId) {
    return this.request(2, cityId);
  },

  getCounties: function (countyId) {
    return this.request(3, countyId);
  },

  getTowns: function (townId) {
    return this.request(4, townId);
  }
};