/*
 * Example 1:
 * <* fx="switch[switchid=div1]" >1</*>
 * <* fx="switch[event=mouseover;switchid=div2]" >1</*>
 * <* fx="switch[event=mouseover;switchclass=c1;nochangeclass]" >1</*>
 *
 * <* id="div1">content1</*>
 * <* id="div2">content2</*>
 * <* class="c1">content3</*>
 *
 * Example 2:
 * <* fx="switch[switchid=diva;group=some]" >1</*>
 * <* id="diva">content1</*>
 *
 * 必须有switchid或switchclass中的一个或两个
 * 多个分组时用group参数
 * event可以是mouseover mouseout click 等事件
 * 如果IE6 下出现页面跳动, 给被switch的*们再包一个div, 然后让这个div的高宽固定
 *
 * */


ZARK_FX.getFrame('jquery-1.3.2', function($){
    var switch_groups = {};

    ZARK_FX.run('switch', function(attrs){

        var $this = $(this);
        var group = attrs.group !== undefined? attrs.group : 'default';
        var switchFunction = function(){
            for(var i in switch_groups[group]){
                var $a = switch_groups[group][i];
                var hide_id = ZARK_FX.parserFx($a.attr(ZARK_FX.FX_NAME))['switch'].switchid;
                var hide_cl = ZARK_FX.parserFx($a.attr(ZARK_FX.FX_NAME))['switch'].switchclass;
                if (hide_id !== undefined) $('#'+hide_id).hide();
                if (hide_cl !== undefined) $('.'+hide_cl).hide();
                $a.addClass('zarkfx_unchosed').removeClass('zarkfx_chosed');
            };
            var show_id = attrs.switchid;
            var show_cl = attrs.switchclass;
            if (show_id !== undefined) $('#'+show_id).show();
            if (show_cl !== undefined) $('.'+show_cl).show();
            if (attrs.nochangeclass === undefined) $this.addClass('zarkfx_chosed').removeClass('zarkfx_unchosed');
            if ($this.attr('nodeName') === 'A') {
                $this.blur();
                return false;
            };
        };

        // bind event
        if(attrs['event'] === undefined){
            $this.click(switchFunction);
        }else{
            $this.bind(attrs['event'], switchFunction);
        };
        
        // add $this to switch_groups
        if(switch_groups[group] === undefined){
            switch_groups[group] = [];
        };
        switch_groups[group].push($this);

        /*
        // show the first switched, and hide others
        if (switch_groups[group].length == 1){
            if (attrs.nochangeclass === undefined) $this.addClass('zarkfx_chosed').removeClass('zarkfx_unchosed');
            if (attrs.switchid !== undefined) $('#'+attrs.switchid).show();
        }else{
            if (attrs.switchid !== undefined) $('#'+attrs.switchid).hide();
            if (attrs.switchclass !== undefined) $('.'+attrs.switchclass).hide();
        };

        // change the first switcher's class
        if (switch_groups[group].length == 1){
            if (attrs.switchclass !== undefined) $('.'+attrs.switchclass).show();
        }else{
            if (attrs.nochangeclass === undefined) $(this).addClass('zarkfx_unchosed').removeClass('zarkfx_chosed');
        };
        */

    });
});
