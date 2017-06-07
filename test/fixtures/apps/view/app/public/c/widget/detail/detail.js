define('component/widget/detail/detail.js', function(require, exports, module){require('widget/boot');

function like(evt) {
  var $zan = $('.btn-zan');
  var $count = $zan.find('.count');
  var id = $zan.attr('data-newsId');
  var count = $count.html();
  var isLiked = $zan.hasClass('press');
  if (count) {
    count = +count.substring(1, count.length - 1);
  }

  // like
  if (!isLiked) {
    $zan.addClass('press');
    $count.html('(' + (count + 1) + ')');
  }
  // unlike
  else {
    del('z' + id);
    $count.html('(' + (Math.max(count - 1, 0)) + ')');
    $zan.removeClass('press');
  }
}

function share(evt) {
  var $share = $('.btn-share');
  var $count = $share.find('.count');
  var id = $share.attr('data-newsId');
  var count = $count.html();
  var isShared = $share.hasClass('press');
  var data = {};
  if (count) {
    count = +count.substring(1, count.length - 1);
  }

  if (!isShared) {
    $share.addClass('press');
    $count.html('(' + (count + 1) + ')');
  }

  // 非自动点击才唤起
  if (evt) {
    data.imageList = data.imageList || [];
    //console.info('share', data);

    var tinyImg = data.imageList.filter(function(item){
        return item.type == 1
      })[0] || {};

    var bigImg = data.imageList.filter(function(item){
        return item.type == 2;
      })[0] || {};

  }
}

$(document.body).on('click', '.btn-zan', like);

$(document.body).on('click', '.btn-share', share);

});