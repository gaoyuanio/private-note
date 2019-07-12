var bridgeHelper = {
  isIOS: function () {
    var UA = window.navigator.userAgent.toLowerCase();
    return (UA && /iphone|ipad|ipod|ios/.test(UA));
  },
  openContact: function (applicationOID) {
    console.log('call bridge with applicationOID: ', applicationOID)
    if (!window.HandBridge) return false
    var params = {
      className: 'WebViewBridge',
      function: 'openNewWebviewContact',
      successCallBack: '',
      failCallBack: '',
      params: {
        url: "dist/index.html?loginType=cd&hash=application-edit&formType=1004&applicationOID=" + applicationOID,
        appCode: "APPLICATION_FORM"
      }
    }
    if (this.isIOS()) {
      HandBridge.postMessage(params);
    } else {
      HandBridge.postMessage(JSON.stringify(params));
    }
    return true
  }
};
