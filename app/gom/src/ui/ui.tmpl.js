export const button = `<button class="btn btn-{{= data.type }} {{= data.outline ? 'btn-outlined':''}} {{= data.isblock ? 'btn-block' : ''}}">
    {{ if(data.icon){ }}<span class="icon {{= data.icon }}"></span>{{ } }}
    {{= data.title }}
    {{ if(data.badge!==void 0){ }}
    <span class="badge badge-{{= data.type}}">{{=data.badge}}</span>
    {{ } }}
</button>`;

export const header = `{{ ['left', 'right'].map(function(posi){ }}
{{ var type= data[posi].type, text = data[posi].text, icon=data[posi].icon || 'icon-'+posi+'-nav'; }}
{{ if(type === 'button'){ }}<button class="btn pull-{{=posi}}">{{= text?text:'' }}</button>{{ } }}
{{ if(type === 'icon'){  }}<a class="icon {{= icon }} pull-{{=posi}}">{{= text?text:'' }}</a>{{ } }}
{{ if(type === 'link'){  }}<button class="btn btn-link btn-nav pull-{{=posi}}">{{= text?text:'' }}</button>{{ } }}
{{ }); }}

<div class="title-wrapper {{=data.subtitle ? 'title-ms' : ''}}">
    <h1 class="title">{{=data.title}}</h1>
    {{ if(data.subtitle){ }}<h2 class="subtitle">{{=data.subtitle}}</h2>{{ } }}
</div>`;

export const list = `
{{= data.card ? '<div class="card">' : '' }}
<ul class="table-view">
    {{ data.list.map(function(item){ }}

    <li class="{{= item.isDivider?'table-view-divider':'table-view-cell' }}{{= item.collapse ? ' table-view-collapse' : '' }}">
        {{ if(item.isDivider){ }}{{=item.title}}{{ return; } }}
        <a class="navigate-right" href="{{= item.hash ? item.hash : 'javascript:' }}">
            {{ if(item.badge !== void 0){ }}
            <span class="badge">{{=item.badge}}</span>
            {{ } }}
            {{ if(data.media){ }}
            {{ if(data.media === 'img' && item.img){ }}
            <img class="media-object pull-left" src="{{= item.img }}">
            {{ }else{ }}
            <span class="media-object pull-left icon {{= item.icon }}"></span>
            {{ } }}
            {{ } }}
            <div class="media-body">
                {{=item.title}}
                <p>{{=item.content ? item.content : ''}}</p>
            </div>
        </a>
    </li>
    {{  }); }}
</ul>
{{= data.card ? '</div>' : '' }}
`;

export const modal = `
{{ if(data.type.indexOf('toast') === -1 ){ }}
<div class="{{=data.type != 'loading' ? 'modal-layout' : ''}} modal-{{=data.type}} {{=data.class}}">
    {{ if(data.close===true){ }} <span class="icon icon-close"></span> {{ } }}
    <div class="modal-inner">
        {{ if(data.type === 'loading'){ }}
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
        {{ }else{ }}
        <div class="modal-title">
            {{if(data.type==='bottom' && data.btns.yes && data.btns.no){ }}<span class='btn modal-btn btn-link modal-btn-no'>{{=data.btns.no}}</span>{{=data.title}}<span class='btn modal-btn btn-link modal-btn-yes'>{{=data.btns.yes}}</span>
            {{ }else{ }}  {{=data.title}}  {{ } }}
        </div>
        <div class="modal-text">{{=data.content}}</div>
        {{ } }}
    </div>
    {{ var btns = data.btns; if(btns && (data.type!=='bottom')){ }}
    <div class="modal-buttons">
        {{ if(btns.yes){ }}<span class="modal-button modal-btn modal-btn-yes modal-button-bold">{{= btns.yes}}</span> {{ } }}
        {{ if(btns.no){ }}<span class="modal-button modal-btn modal-btn-no modal-button-bold">{{= btns.no}}</span> {{ } }}
        {{ if(btns.cancel){ }}<span class="modal-button modal-btn modal-btn-def modal-button-bold">{{= btns.def}}</span> {{ } }}
    </div>
    {{ } }}
</div>
{{ }else{ }}
<div class="modal-toast modal-{{=data.type}}" >
    {{ var type = /toast-(\\w+)/.exec(data.type)[1] }}
    <span class="icon icon-{{= type==='info' ? 'info' : (type==='error'?'close': 'check')  }}">{{=data.content}}</span>
</div>
{{ } }}`;

export const sides = `
<div class="sides-overlay"></div>
<div class="sides sides-{{= data.position }}"></div>
`;

export const switcher = `{{ var switchType = /(^\\w+)-?(\\w+)?/.exec(data.type), isSlide = switchType[1]==='slide', position = switchType[2];}}
<div class="switch-container slide-container {{= isSlide ? 'slide-container-'+position : 'tab-container slide-container-horizontal'}}">
    {{ if(isSlide || (!isSlide && position==='top')){ }}
    <div class="switch-pagination {{= isSlide ? 'slide-pagination' : 'segmented-control'}}">
        {{ data.list.map(function(item, i){ }}
            <span  index="{{=i}}" class="switch-pagination-bullet {{= isSlide ? 'slide-pagination-bullet' : 'control-item'}} {{= i===0 ? 'active' : '' }}">{{=item.title}}</span>
        {{ }); }}
    </div>
    {{ } }}
    <div class="switch-wrapper slide-wrapper" index="0">
        <!--<div class="slide-slide slide-slide-active"></div>
        <div class="slide-slide slide-slide-next"></div>-->
        {{data.list.map(function(item, i){ }}
            <div class="switch-item control-content">{{=item.content}}</div>
        {{ }); }}
    </div>
    {{ if(!isSlide && position==='bottom'){ }}
    <nav class="bar bar-tab switch-pagination">
        {{ data.list.map(function(item, i){ }}
        <a class="tab-item switch-pagination-bullet {{= i===0 ? 'active' : '' }}" href="#" index="{{=i}}">
            {{ if(item.icon){ }}<span class="icon {{=item.icon}}"></span> {{ } }}
            <span class="tab-label">{{=item.title}}</span>
        </a>
        {{ }); }}
    </nav>
    {{ } }}
</div>
`;
