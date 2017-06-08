{% if list and list.length > 0 %}
<div class="p-list_fragment" scroll-item="{{list.length}}" scroll-page="0">
  {% for item in list %}
    {% require $id="widget/card"%}
  {% endfor %}
</div>
{% elif list and list.length == 0 %}
<div class="p-list_empty tips-full">
  <div class="tips-info">
    <div class="icon-nothing-full"></div>
    <div class="info-text">没有任何内容哦，下拉更新看看</div>
  </div>
</div>
{% endif %}


{% script %}
  require('component/widget/list/list.js');
{% endscript %}