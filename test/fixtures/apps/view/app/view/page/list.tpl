{% extends 'layout/layout.tpl' %}
{% block content %}
  <p>content not from template string.</p>
  {% require $id='page/list' %}
{% endblock %}
