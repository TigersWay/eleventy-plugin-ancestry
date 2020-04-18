---
title: Ancestry Plugin Demo
templateEngineOverride: md,njk
---
{%- macro show(item) -%}
[{{ item.data.title }} ({{ item.url }})]({{ item.url }})
{%- endmacro -%}

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

There are all here, but we cannot see any obvious organization.

## Now using Ancestry

We can easily locate any document...

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
{% set item = '/animalia/chordata/reptilia/cobra' | find %}
- {{ item.data.title }} {url:'{{ item.url }}'}
```
{% endraw%}
{% set item = '/animalia/chordata/reptilia/cobra' | find %}
- {{ show(item) }}

... and their children:

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

Children which can be sorted with a "deep" property.

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
