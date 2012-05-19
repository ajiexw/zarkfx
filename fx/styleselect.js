FX.getFrame('jquery-1.3.2', function($){

    if(FX.detect.browser === 'IE' && FX.detect.version === 6){ // ie6 hack
        FX.getCSS(FX.CSS_PATH + 'jquery-styleSelect/default-ie6.css');
    };

    FX.run('styleselect', function(attrs){
    
        var $old_select = $(this);
        if (attrs.jScrollPane){
            FX.getCSS(FX.CSS_PATH + 'jquery-styleSelect/' + attrs.style +'-jscrollpane.css');
        };
        FX.getCSS(FX.CSS_PATH + 'jquery-styleSelect/' + attrs.style +'.css');

        var org_name = $old_select.attr('name');
        var org_tab_index = $old_select.attr('tabindex');

        $old_select.hide();

        //create new selector 
        var $new_select = $('<div></div>')
            .attr('tabindex', org_tab_index)
            .css({position : 'relative', display: 'none'})
            .addClass('fx_styleselect_' + attrs.style)
            .insertBefore($old_select);
                
        var $main_container = $('<div></div>')
            .addClass('fx_styleselect_item')
            .css({position : 'absolute'})
            .hide()
            .appendTo($new_select);

        // resize width and height for new_select and options
        if (attrs.width !== 0){
            $new_select.width(attrs.width);
            if(attrs.optionsWidth === 0){
                attrs.optionsWidth = attrs.width;
            }
        }
        if (attrs.height !== 0){
            $new_select.height(attrs.height);
            if(attrs.optionsHeight === 0){
                attrs.optionsHeight = attrs.height;
            }
        }

        if (attrs.optionsTop !== 0)
            $main_container.css('top',  attrs.optionsTop);

        if (attrs.optionsLeft !== 0)
            $main_container.css('left', attrs.optionsLeft);
        
        $('<div class="fx_styleselect_item_start"></div><div class="fx_styleselect_item_content"></div><div class="fx_styleselect_item_end">').appendTo($main_container);
        var $middle_container = $('.fx_styleselect_item_content', $main_container);

        // create new options
        var $ul_container = $('<ul></ul>').appendTo($middle_container);
            
        $old_select.find('option').each(function(){
            var $old_option = $(this);
            var $new_option = $('<li></li>');

            var copy_attrs = FX.splitValue(attrs.copyAttrs),
                i = 0;
            for( ; i < copy_attrs.length; i++ ){
                var attr_name = copy_attrs[i];
                if (typeof $old_option.attr(attr_name) !== 'undefined')
                    $new_option.attr(attr_name, $old_option.attr(attr_name));
            }

            if ( $old_option.is(':selected') )
                $new_option.attr('selected', 'selected');

            $('<span style="display: block;"></span> ').text($old_option.text()).appendTo($new_option);

            $.data($new_option[0], 'fx_org_value', $old_option.attr('value'));

            $ul_container.append($new_option);

        });

        var $span_selected = $('<span></span>').appendTo($new_select);

        if (attrs.optionsWidth !== 0){
            $('li, span', $ul_container).css('width', attrs.optionsWidth);
            $span_selected.css('width', attrs.optionsWidth);
        }
        if (attrs.optionsHeight !== 0){
            $('li, span', $ul_container).css('height', attrs.optionsHeight);
            $span_selected.css('height', attrs.optionsHeight);
        }

        // 显示selected的option, 否则就显示第一个
        var $selected_li,
            selected_class;

        var showSelected = function(){
            if ( $('li[selected=selected]', $ul_container).length > 0){
                $selected_li = $('li[selected=selected]', $ul_container).eq(0);
            }else{
                $selected_li = $('li', $ul_container).eq(0);
            }
            if ( $selected_li[0] === $('li', $ul_container).eq(0)[0] ){
                $span_selected.removeClass('fx_active').addClass('fx_passive');
            }else{
                $span_selected.removeClass('fx_passive').addClass('fx_active');
            }
            $span_selected.text($selected_li.text());
        }
        showSelected();

        var openMainContainer = function(){
            $span_selected.removeClass('fx_closed').addClass('fx_expended');
            $main_container.slideDown(attrs.speed);
        }
        var closeMainContainer = function(){
            $span_selected.removeClass('fx_expended').addClass('fx_closed');
            $main_container.slideUp(attrs.speed);
        }

        var first_jscrollpane = true;
        $span_selected.addClass('fx_closed').click(function(event){
            if ( $main_container.is(':hidden') ){
                openMainContainer();
            }else{
                closeMainContainer();
            }
            if (attrs.jScrollPane && first_jscrollpane){
                first_jscrollpane = false;
                $middle_container.jScrollPane();
            }
        });

        var doSelection = function(click_item){
            
            var $li = $(click_item);

            $li.siblings().removeAttr('selected');
            $li.attr('selected', 'selected');

            showSelected();
            closeMainContainer();
    
            if (attrs.triggerChange){
                $old_select.val($.data(click_item, 'fx_org_value'));
				$old_select.trigger('change');
            }
        }

        $('li', $ul_container).click(function(){
            doSelection(this);
        });

        // 失去焦点时自动关闭
        if (attrs.blurClose){
			$(document).click(function(event){
                //因为span_selected的click事件会冒泡到document,
                //所以如果不做此判断的话, 点击span_selected就会立刻关闭main_container
                if (event.target !== $span_selected[0]){
                    closeMainContainer();
                }
			});
        }

        $new_select.focus(function(){
            $(this).blur();
        });

        $new_select.show();

    }, {

        style:          'default',
        jScrollPane:    false,
        optionsTop:     0, //弹出层距离顶部的高度
        optionsLeft:    0,
        optionsWidth:   0,
        optionsHeight:  0,
        width:          0,
        height:         0,
        speed:          0,
        jScrollPaneOptions: '',
        copyAttrs:      'id, class',
        triggerChange:     true,
        blurClose:      true

    }, ['jquery-mousewheel', 'jquery-jscrollpane'] );

});
