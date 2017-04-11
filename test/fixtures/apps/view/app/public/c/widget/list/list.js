define('components/widget/list/list.js', function(require, exports, module){require('widget/boot');

function showTips(evt) {
  var $dom = $(evt.target).children(".close-tips");
  $dom.show();

  setTimeout(function(){
    $dom.focus();
    if (!evt.target.__stone) {
      $dom.on('blur', hideTips);
      evt.target.__stone = 1;
    }
  }, 0);
  return false;
}

function hideTips(evt) {
  $(evt.target).fadeOut();
}

function removeItem(evt) {
  var $list = $(".p-list .card");
  var id = $(evt.target).attr('data-newsId');
  var $dom = $list.filter(function(index){
    return $(this).attr('data-newsId') == id;
  });

//  $dom.fadeOut(500, function (){
//    $dom.hide(); // 只隐藏
//  });
  $dom.remove();

  if (!id) {
    console.error("无删除id");
  }

  return false;
}

$(document.body).on('click', '.p-list .close', showTips);

$(document.body).on('click', '.p-list .close .close-tips', removeItem);

pagelet.load({
  url : '/',
  pagelets: ['layout.main'],
  params : 'ctoken=WUNIM8acihzeoWTalFsZnut-example'
});

});