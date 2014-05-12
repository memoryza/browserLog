/**
 * 客户端log日志
 * author:memoryza
**/
(function() {
    window.onerror = function(msg, errfile, line) {
        var xhr = createXHR();
        if(xhr) {
            errfile = errfile ? errfile : '';
            line = line ? line : '';
            if(!errfile || !line) return false;
            xhr.onreadystatechange= function (){}
            var info = navigator.userAgent,
                 msg = msg.replace(/!|\*|\(|\)|\'|~/g, ''),
                 url = location.href,
                 md5code = md5(encodeURIComponent(msg) + errfile + line+info);
            xhr.open('POST','/clientError/ReceiveError.html',true);
            xhr.setRequestHeader('CONTENT-TYPE','application/x-www-form-urlencoded');
            xhr.send("message=" + msg +"&errfile=" + errfile+ "&line="+ line + "&info=" + info+ "&code=" + md5code + "&url=" + url );
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

