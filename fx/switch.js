/*
 * Example 1:
 * <* fx="switch[switchid=div1]" >1</*>
 * <* fx="switch[event=mouseover;switchid=div2]" >1</*>
 * <* fx="switch[event=mouseover;switchClass=c1;]" >1</*>
 *
 * <* id="div1">content1</*>
 * <* id="div2">content2</*>
 * <* class="c1">content3</*>
 *
 * Example 2:
 * <* fx="switch[switchid=diva;group=some]" >1</*>
 * <* id="diva">content1</*>
 *
 * 必须有switchid或switchClass中的一个或两个
 * 多个分组时用group参数
 * event可以是mouseover mouseout click 等事件
 * 如果IE6 下出现页面跳动, 给被switch的*们再包一个div, 然后让这个div的高宽固定
 *
 * */

// todo  switch应该把switchid改为选择器

// 因为lazyload.js不支持jquery-1.3.2, 因此如果这里的frame使用了1.3.2, 那么就不能支持withLazyLoad参数.

FX.getFrame('jquery-1.5.1', function($){
    var switch_groups = {};
    var lazyload_top  = {}; // only for with lazyload
    var lazyload_left = {}; // only for with lazyload

    FX.run('switch', function(attrs){

        var $this = $(this);
        var group = attrs.group !== undefined ? attrs.group : 'default_group';
        var showThis = function(){
            for(var i in switch_groups[group]){
                var $a = switch_groups[group][i];
                var hide_id = FX.parseFX($a.attr(FX.FX_NAME))['switch'][0].switchid;
                var hide_cl = FX.parseFX($a.attr(FX.FX_NAME))['switch'][0].switchClass;
                if (hide_id !== undefined) $('#'+hide_id).hide();
                if (hide_cl !== undefined) $('.'+hide_cl).hide();
                $a.addClass(attrs.unselectedClass).removeClass(attrs.selectedClass);
            };
            var show_id = attrs.switchid;
            var show_cl = attrs.switchClass;
            if (show_id !== undefined) $('#'+show_id).show();
            if (show_cl !== undefined) $('.'+show_cl).show();
            $this.addClass(attrs.selectedClass).removeClass(attrs.unselectedClass);
            if ($this.attr('nodeName') === 'A') {
                $this.blur();
            };
        };

        // bind event
        $this.bind(attrs.event, showThis);
        
        // add $this to switch_groups
        if(switch_groups[group] === undefined){
            switch_groups[group] = [];
        };
        switch_groups[group].push($this);

        var show_this = false,
            href = window.location.href;

        if (attrs.autoHidden && switch_groups[group].length == 1){
            show_this = true;
        }

        if (attrs.switchByAnchor && href.indexOf('#!') !== -1){
            var auto_show_id = href.substr(href.indexOf('#!') + 2);
            if ( auto_show_id.length > 0 && attrs.switchid === auto_show_id){
                show_this = true;
            }
        }

        if (show_this){
            showThis();
        }else if(attrs.autoHidden){
            if (attrs.switchid !== undefined) $('#'+attrs.switchid).hide();
            if (attrs.switchClass !== undefined) $('.'+attrs.switchClass).hide();
            $this.addClass(attrs.unselectedClass);
        }

        // used with lazyload
        if (attrs.withLazyLoad){
            // 按照group分组, 在lazyload_top和lazyload_left中保存大于0的最小值.
            var this_scroll_top = $this.offset().top;
            if (this_scroll_top !== 0 && (typeof lazyload_top[group] === 'undefined' ||  lazyload_top[group] > this_scroll_top)){
                lazyload_top[group] = this_scroll_top;
            };
            var this_scroll_left = $this.offset().left;
            if (this_scroll_left !== 0 && (typeof lazyload_left[group] === 'undefined' ||  lazyload_left[group] > this_scroll_left)){
                lazyload_left[group] = this_scroll_left;
            };
            // 绑定img的scrollTop和scrollLeft函数, 返回所在group的大于零的最小值
            $('#'+attrs.switchid+' img[fx*=lazyload]').each(function(){
                $.data(this, "zarkfx.lazyload.scrollTop", function(){
                    if (typeof lazyload_top[group] !== 'undefined'){
                        return lazyload_top[group];
                    }else{
                        return 0;
                    };
                });
                $.data(this, "zarkfx.lazyload.scrollLeft", function(){
                    if (typeof lazyload_left[group] !== 'undefined'){
                        return lazyload_left[group];
                    }else{
                        return 0;
                    };
                });
            });

        };

    }, {
        switchid:       undefined,
        switchClass:    undefined,
        event:          'click',
        autoHidden:     true,  // 在onload时自动隐藏其它div
        selectedClass:  'zarkfx_switch_selected',
        unselectedClass:'zarkfx_switch_unselected',
        // 如果被switch的内容里有lazyload的img, 那么需要把这个参数设置为true才能让img延迟加载.
        withLazyLoad:   false,
        // 根据url最后制定的id自动显示, 比如 /index?#!showme
        switchByAnchor:     true
    });

});
