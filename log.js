/**
 * 客户端log日志
 * author:memoryza
**/
(function() {
    window.onerror = function(msg, url, line) {
        var xhr = createXHR();
        if(xhr) {
            xhr.onreadystatechange= function (){}
            var info = navigator.userAgent,
                 msg = msg.replace(/!|\*|\(|\)|\'|~/g, ''),
                 md5code = md5(encodeURIComponent(msg) + url + line+info);
            xhr.open('POST','/clientError/ReceiveError.html',true);
            xhr.setRequestHeader('CONTENT-TYPE','application/x-www-form-urlencoded');
            xhr.send("message=" + msg +"&url=" + url+ "&line="+ line + "&info=" + info+ "&code=" + md5code );
        }
    }
    function createXHR() {
        var xhr;
            try {
                if(window.ActiveXObject) {
                    xhr = new window.ActiveXObject( "Microsoft.XMLHTTP" );
                } else if(window.XMLHttpRequest) {
                    xhr =  new window.XMLHttpRequest();
                }
            } catch(e) {
            }
        return xhr;
    }
})();

