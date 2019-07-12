var app_key = '294aceb2178f476abac15dd66c1af36f';
var app_secret = 'af5f3f57179247f4be3fe110b0251070';
var redirect_uri = '';
var state = 1;
var view = 'wap';
var username = '%E6%B1%89%E5%BE%97%E4%BF%A1%E6%81%AF';//urlencode('汉得信息');
var pwd = '6485CE0E3D9EE07AF005DA24CA71CCB8';//md5('jd.com');

var access_token = 'e41c826aebf44bcbaee52b7eed2625da8';

/**
 * 获取分类
 */
function do_api(app_name,json_params){	
	json_params = JSON.stringify(json_params);		
	param_json = json_params ? json_params : '{}';
	var result;
	var timestamp = getNowFormatDate();//date('Y-m-dH:i:s');	
	var url = "https://router.jd.com/api?method="+app_name+"&app_key="+app_key+"&access_token="+access_token+"&timestamp="+timestamp+"&v=1.0&format=json&param_json="+json_params;
	$.ajax({
		url:url,
		async : false,//设置为同步操作就可以给全局变量赋值成功
		success:function(re){
			result = re;	
		}	
	});
	return result;
}
/**
 * 格式化时间
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + "" + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}