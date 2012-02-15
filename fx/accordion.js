ZARK_FX.getFrame('jquery-1.3.2', function($){
    var this_url = window.location.href.replace('http://','');
    var this_url_relative = this_url.substr(this_url.indexOf('/'));

    ZARK_FX.run('accordion', function(attrs){

        var $this = $(this);                 
        ZARK_FX.getCSS(ZARK_FX.CSS_PATH + 'accordion/' + attrs.style +'.css');
        /*set class*/
        $this.addClass('zarkfx_accordion_div1')
        $('> ul',$this).addClass('zarkfx_accordion_ul1')
        $('> ul > li',$this).addClass('zarkfx_accordion_li1')
        $('> ul > li > a',$this).addClass('zarkfx_accordion_a1')
        $('> ul > li > div',$this).addClass('zarkfx_accordion_div2')
        $('> ul > li > div > ul',$this).addClass('zarkfx_accordion_ul2')
        $('> ul > li > div > ul > li',$this).addClass('zarkfx_accordion_li2')
        $('> ul > li > div > ul > li > a',$this).addClass('zarkfx_accordion_a2')

        /*DOM  actions*/
        $('ul > li > div',$this).each(function(){
            var blind_div = $(this);
            $(this).prev('a').click(function(){
                if (blind_div.css('display') == 'none'){
                    var click_a = $(this);
                    blind_div.show('blind',{},attrs.speed,function(){
                        click_a.next('span').hide();
                    });
                }else{
                    var click_a = $(this);
                    blind_div.hide('blind',{},attrs.speed,function(){
                        click_a.next('span').show();
                        blind_div.parent().find('.zarkfx_accordion_span1').css("background","url("+attrs.down_img+") top right no-repeat");
                    });
                }
            });
        });
        $('.zarkfx_accordion_a1',$this).after('<span class="zarkfx_accordion_span1"></span>').each(function(){
            if (($(this).attr('href') == undefined) || ($(this).attr('href').length == 0)){
                $(this).attr('href','javascript:;');
            }
        });
        $('.zarkfx_accordion_a2',$this).after('<span class="zarkfx_accordion_span2"></span>');
        $this.width($this.width()); //为了ie浏览器兼容性

        /*events for css*/
        $('.zarkfx_accordion_li1',$this).mouseover(function(){
            //如果此li没有子项son
            if ($(this).find('li').length == 0) { 
                //如果此li中的某个son被选中，则箭头不出现,否则箭头出现
                if ( $(this).attr('fx_selected') != 'son') {
                    $('.zarkfx_accordion_span1',$(this)).css("background","url("+attrs.right_img+") top right no-repeat");
                }
            }else{//否则有子项
                if ($(this).find('.zarkfx_accordion_div2').css('display') == 'none'){
                    $('.zarkfx_accordion_span1',$(this)).css("background","url("+attrs.down_img+") top right no-repeat");
                }
            }
        }).mouseout(function(){
            if ($(this).attr('fx_selected') != 'selected'){ //如果选中了此li，则箭头不消失,如果此li的某个son没选中，则此li必然不会被选中
                $('.zarkfx_accordion_span1',$(this)).css("background","");
            }
        });

        $('.zarkfx_accordion_li2',$this).mouseover(function(){
            $('.zarkfx_accordion_span2',$(this)).css("background","url("+attrs.right_img+") top right no-repeat");
        }).mouseout(function(){
            if ($(this).attr('fx_selected') != 'selected'){ //如果选中了此li，则箭头不消失
                $('.zarkfx_accordion_span2',$(this)).css("background","");
            }
        });

        /*set selected*/
        $('li > a',$this).each(function(){
            //如果此项默认被选中（即为当前页面）
            if ($(this).attr('href') === this_url || $(this).attr('href') === this_url_relative ){
                $(this).parent().attr('fx_selected','selected');
                $(this).parent().find('.zarkfx_accordion_span1').css("background","url("+attrs.right_img+") top right no-repeat");
            }
        });

        /*set expand*/
        $('.zarkfx_accordion_div2',$this).hide();
        $('.zarkfx_accordion_li2 > a',$this).each(function(){
            //如果此项默认被选中（即为当前页面）
            if ($(this).attr('href') === this_url || $(this).attr('href') === this_url_relative ){
                $(this).parent().attr('fx_selected','selected');
                $(this).parent().find('.zarkfx_accordion_span2').css("background","url("+attrs.right_img+") top right no-repeat");
                $(this).parent().parent().parent().parent().find('.zarkfx_accordion_div2').show();
            }
        });

    }, {            
        speed       : 200,
        auto        : false,
        pause       : 0,
        right_img   : ZARK_FX.IMG_PATH + 'accordion/right.png',
        down_img    : ZARK_FX.IMG_PATH + 'accordion/down.png',
        style       : 'default'
    }, 'jqueryui-1.8.14');
});
