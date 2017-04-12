
{% pagelet $id="header" %}
{{ 'welcome egg world' | hello }}
{% endpagelet %}
{% pagelet $id="main" class="p-list" %}
  {% require $id="widget/list" %}
{% endpagelet %}

{% pagelet $id="footer" %}

{% endpagelet %}
