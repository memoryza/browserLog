<?php
 /**
  * 搜集前端报错的数据汇总
 **/
define('PROJECT_DIR', dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . 'log' . DIRECTORY_SEPARATOR);
class ClientErrorController  extends App{
    public function init(){
        parent::init();
    }
    /**
     * 根据客户端传递来的错误信息来监控
     * info:navigator.userAgent的串，之所以不再客户端确认是为了少100-200行代码
     * md5值是信息,访问连接，行号和浏览器信息顺序的拼接的md5值
    **/
    public function actionReceiveError(){
        //放到数据库里吧，把md5作为key，去掉客户端重复上报的问题或是恶意上报
        do {
            $msg = isset($_POST['message']) && $_POST['message'] ? $_POST['message'] : '';
            $url = isset($_POST['url']) && $_POST['url'] ? $_POST['url'] : '';
            $line = isset($_POST['line']) && $_POST['line'] ? $_POST['line'] : '';
            $md5code = isset($_POST['code']) && $_POST['code'] ? $_POST['code'] : '';
            $info = isset($_POST['info']) && $_POST['info'] ? $_POST['info'] : '';
            if(!$msg || !$url || !$line || !$md5code||!$info) {
                break;
            }
            //ff下对中文转义\\后台继续转义
            $tempmsg = rawurlencode($msg);
            $tempmsg = str_replace( '%5C%5C', '%5C', $tempmsg);
            //只收集我们的，恶意数据
             if(md5($tempmsg.$url.$line.$info) == $md5code) {
                   $content = "\n[" . Date('Y-m-d h:i:s'). "]\n";
                   $content .= "报错文件:{$url}\n";
                   $content .= "错误信息:{$msg}\n";
                   $content .= "报错行号:{$line}\n";
                   $content .= "客户端浏览器环境:{$info}\n";
                  file_put_contents(PROJECT_DIR . 'client_js_error.log', $content , FILE_APPEND );
            }
            break;
        } while (1);
        exit;
    }
}
