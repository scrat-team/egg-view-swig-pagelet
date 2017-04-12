require('framework/zepto');
var config = window._config || {};

// pagelet 通用配置
{
  // 监听页面点击事件，自动加载pagelet
  pagelet.autoload('layout');

  // 开启页面缓存功能
  pagelet.cache();

  // 监听hash不一致的报错，然后重刷。（容错机制，一般发生在用户在使用，但版本在更新）
  pagelet.on(pagelet.EVENT_LOAD_ERROR, function(e){
    if(e.error === 'hash inconsistency'){
      location.reload();
    }
  });
}
