---
title: Demo
templateEngineOverride: md,njk
---
{%- macro show(item) -%}
{{ item.data.title }} {url:'{{ item.url }}'}
{%- endmacro -%}
# Ancestry Plugin Demo


## Using Standard Collection access

{% raw %}
```
{%- for item in  collections.animalia %}  
- {{ item.data.title }} {url:'{{ item.url }}'}
{%- endfor %}
```
{% endraw%}
{%- for item in  collections.animalia %}
- {{ show(item) }}
{%- endfor %}


## Now using Ancestry

### find

{% raw %}
```
{% set item = '/index' | find %}
- {{ item.data.title }} {url:'{{ item.url }}'}
```
{% endraw%}
{% set item = '/index' | find %}
- {{ show(item) }}
{% raw %}
```
{% set item = '/animals/reptiles/cobras' | find %}
- {{ item.data.title }} {url:'{{ item.url }}'}
```
{% endraw%}
{% set item = '/animals/reptiles/cobras' | find %}
- {{ show(item) }}

### children

{% raw %}
```
{%- for item in '/index' | children %}
- {{ item.data.title }} {url:'{{ item.url }}'}
{%- endfor %}
```
{% endraw%}
{%- for item in '/index' | children %}
- {{ show(item) }}
{%- endfor %}

{% raw %}
```
{%- for item in '/animalia/chordata/mammalia/index' | children %}
- {{ item.data.title }} {url:'{{ item.url }}'}
{%- endfor %}
```
{% endraw%}
{%- for item in '/animalia/chordata/mammalia/index' | children %}
- {{ show(item) }}
{%- endfor %}


### Sorted children
{% raw %}
```
{%- for item in '/animalia/chordata/mammalia/index' | children | sorted('data.title') %}
- {{ item.data.title }} {url:'{{ item.url }}'}
{%- endfor %}
```
{% endraw%}
{%- for item in '/animalia/chordata/mammalia/index' | children | sorted('data.title') %}
- {{ show(item) }}
{%- endfor %}
