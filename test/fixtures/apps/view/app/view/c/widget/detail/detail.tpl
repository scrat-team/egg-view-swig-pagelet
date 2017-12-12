<div class="detail-content">
  <div class="detail-news">
    <h1>{{newsInfo.title}}</h1>

    <div class="info">
      <span class="sort">{{newsInfo.categoryName}}</span>
      <span class="time">{{newsInfo.createTime }}</span>
      {% if newsInfo.from %}
        <span class="from">来自: {{newsInfo.from}}</span>
      {% endif %}
    </div>

    <div class="content">{{newsInfo.content | safe}}</div>

    <div class="control">
      <div class="title"><span class="text">我要</span></div>
      <ul class="btns">
        <li class="btn-zan " data-newsId="{{newsInfo.newsId}}">赞<span class="count">({{socialInfo.likeCount}})</span></li>
        <li class="btn-share " data-newsId="{{newsInfo.newsId}}">分享<span class="count">({{socialInfo.shareCount}})</span></li>
      </ul>
    </div>
  </div>
</div>

{% script %}
  require('component/widget/detail/detail.js');
{% endscript %}
