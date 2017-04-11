<div class="card card-news" data-newsId="{{item.newsId}}" data-categoryType="{{item.categoryType}}">
  <a href="/detail/{{item.newsId}}" data-pagelets="layout.header,layout.main" data-params="ctoken={{ctoken}}" data-keep-scroll="">
    <div class="pic">
      {% if item.imageList and item.imageList.length %}
      <img src="{{(item.imageList[0].localizedUrl)}}" class="lazyload" >
      {% endif %}
    </div>
    <div class="con">
      {% if item.title %}
      <div class="name">{{item.title}}</div>
      {% else %}
      <div class="name">{{item.summary | safe}}</div>
      {% endif %}
      <div class="item-sign">
        <div class="info">
          <span class="sort">{{item.categoryName}}</span>
          <span class="time">{{item.createTime}}</span>
        </div>
        <div class="close">
          <div class="close-tips" tabindex="0" data-newsId="{{item.newsId}}" data-categoryName="{{item.categoryName}}">不感兴趣</div>
        </div>
      </div>
    </div>
  </a>
</div>