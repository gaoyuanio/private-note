function  api() {

    return localStorage.getItem('lastname');

}
//用页面的token去获取京东的token
function token(){
    var ddd="";
    var token =localStorage.getItem('lastname');

    $.ajax({
        async: false,
        crossDomain: true,
        url: "/jd/api/config/token/jd",
        //url: "http://apistage.huilianyi.com/jd/api/config/token/jd",
        type: "GET",
        headers: {
            "authorization": "Bearer "+token+"",
            "cache-control": "no-cache",
            "postman-token": "3766bbd2-2f79-afaa-041b-55ee01654f0a"
        },

        success:function(response){

            ddd=response;
            // console.log(response);

        }

    });
    return ddd;

}



var mc=token();
var tokens = mc['accessToken'];
// console.log(mc['accessToken']);


/**
 * 获取分类
 */
var app_key = '294aceb2178f476abac15dd66c1af36f';
var state = 1;
var view = 'wap';

var access_token =mc['accessToken'];
// console.log(access_token);
//封装函数 用于去获取京东的商品信息  适合京东文档所有接口
function do_api(app_name,json_params){
    json_params = JSON.stringify(json_params);
    param_json = json_params ? json_params : '{}';
    var result;
    var timestamp = getNowFormatDate();//date('Y-m-dH:i:s');
    var data={
        method:app_name,
        app_key:app_key,
        access_token:access_token,
        timestamp:timestamp,
        v:'1.0',
        format:'json',
        param_json:json_params
    };
    //var url = "https://router.jd.com/api?method="+app_name+"&app_key="+app_key+"&access_token="+access_token+"&timestamp="+timestamp+"&v=1.0&format=json&param_json="+json_params;
    //if(async==1){
//	  async=true;	
//	}
//	else{
//	   async=false;
//	}
    $.ajax({
        type:'POST',
        url:'/jd',
        data: data,
        //dataType:'json',
        async : false,//设置为同步操作就可以给全局变量赋值成功
        success:function(re){
            //  console.log(re);
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


 