{# 基础布局, 分为上中下 #}
{% extends 'layout/base.tpl' %}
{% block body %}

  {% require $id="view/layout/layout.js" %}

  {% pagelet $id="layout" class="page-content index-main" %}
    {{ helper.someHelper('###test') }}
    {% block content %}{% endblock %}
  {% endpagelet %}

  {###### 在正式部署后，此标签“以上”所有样式文件会内连到page中输出 ######}
  {% ATF %}

  <script>
    // 首屏时间
    window._firstPaintTime = new Date().getTime() - startTime;
  </script>
{% endblock %}
