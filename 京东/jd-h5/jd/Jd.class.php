<?php
/**
 * 京东大客户类
 */
class Jd{
	function __construct($app_key,$app_secret,$redirect_uri,$view,$username,$password,$state){
		$this->app_key      = $app_key;
		$this->app_secret   = $app_secret;
		$this->redirect_uri = $redirect_uri;
		$this->view         = $view;
		$this->username     = $username;
		$this->password     = $password;
		$this->state        = $state;
	}
	/**
	 * [get_token 获取token值]
	 * @return [type] [description]
	 */
	function get_token(){
		$filename = dirname(__FILE__).'/token.txt';//以文件方式保存token
		if(!file_exists($filename) || file_get_contents($filename)==''){
			$url = "https://kploauth.jd.com/oauth/token?grant_type=password&app_key={$this->app_key}&app_secret={$this->app_secret}&state=0&username={$this->username}&password={$this->password}";		
		 
			$reArr = json_decode($this->getCurl($url),true);
			file_put_contents($filename,$reArr['access_token']);
		}
		$str = file_get_contents($filename);		
		return $str;
	}
	/**
	 * [refresh_token 刷新token]
	 * @return [type] [description]
	 */
	function refresh_token(){
		$url = "https://kploauth.jd.com/oauth/token?grant_type=refresh_token&app_key={$this->app_key}&app_secret={$this->app_secret}&state=0&username={$this->username}&password={$this->password}";
		
		$reArr = json_decode($this->getCurl($url),true);
		$filename = dirname(__FILE__).'/token.txt';
		file_put_contents($filename,$reArr['access_token']);
		return $reArr['access_token'];
	}
	refresh_token();
	/**
	 * [do_api 通用app调用方法]
	 * @param  [type] $app_name [接口名称]
	 * @param  [type] $params   [关联数组]
	 * @return [type]           [json支付串]
	 */
	function do_api($app_name,array $params = array()){
		//$k = str_replace('.', '_', $app_name).'_response';
		$access_token = $this->get_token();
		$param_json = $params ? json_encode($params) : '{}';
		$timestamp = date('Y-m-dH:i:s');
		$url = "https://router.jd.com/api?method={$app_name}&app_key={$this->app_key}&access_token={$access_token}&timestamp={$timestamp}&v=1.0&format=json&param_json=".$param_json;		
		$reArr = json_decode($this->vpost($url),true);
		$tmpArr = current($reArr);
		
		if($tmpArr['code']=='1004'){
			$access_token = $this->refresh_token();
			$url = "https://router.jd.com/api?method={$app_name}&app_key={$this->app_key}&access_token={$access_token}&timestamp={$timestamp}&v=1.0&format=json&param_json=".$param_json;
			$reArr = json_decode($this->vpost($url),true);			
		}
		return json_encode($reArr);		
	}
	/**
	 * [getCurl 模拟一个get请求]
	 * @param  [type] $url [description]
	 * @return [type]      [description]
	 */
	function getCurl($url){//get https的内容

	    $ch = curl_init();

	    curl_setopt($ch, CURLOPT_URL, $url);

	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//不输出内容

	    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

	    $result = curl_exec($ch);

	    curl_close($ch);

	    return $result;

	}
	/**
	*调用商品列表
	*/
	function  mygoods($num,$list){
		$app_key = '294aceb2178f476abac15dd66c1af36f';
		$app_secret = 'af5f3f57179247f4be3fe110b0251070';
		$redirect_uri = '';
		$state = 1;
		$view = 'wap';
		$username = urlencode('汉得信息');
		$password = md5('jd.com');
		$jdObj = new Jd($app_key,$app_secret,$redirect_uri,$view,$username,$password,$state);
		$rey = $jdObj->do_api($num,$list);
		$reylist = json_decode($rey,true);
		foreach($reylist as $value){
			$reylist[] = $value;
		}
		$goods = $value['result'];
		return $goods;
	}
	/**
	 * [vpost 模拟一个post请求]
	 * @param  [type] $url  [description]
	 * @param  [type] $data [description]
	 * @return [type]       [description]
	 */
	function vpost($url, $data=''){ // 模拟提交数据函数

	    $curl = curl_init(); // 启动一个CURL会话

	    curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址

	    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE); // 对认证证书来源的检查

	    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE); // 从证书中检查SSL加密算法是否存在

	    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)'); // 模拟用户使用的浏览器

	    // curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转

	    // curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer

	    curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求

	    curl_setopt($curl, CURLOPT_POSTFIELDS, $data); // Post提交的数据包

	    curl_setopt($curl, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循环

	    curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容

	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回

	    $tmpInfo = curl_exec($curl); // 执行操作

	    if (curl_errno($curl)) {

	        echo 'Errno' . curl_error($curl);//捕抓异常

	    }

	    curl_close($curl); // 关闭CURL会话

	    return $tmpInfo; // 返回数据

	}
}