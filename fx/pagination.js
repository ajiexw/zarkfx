/*
 *
 * DOC_BEGIN
 *
 * Pagination
 * ==========
 *
 * 分页
 *
 * 默认样式
 * --------
 * fx="pagination[max=15;displaycount=10;firsttext=第一页;lasttext=末页;style=default]" 
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="pagination[max=15;displaycount=10;firsttext=第一页;lasttext=末页;style=default]" ></div>
 *
 *
 * DOC_END
 *
 */


FX.getFrame('jquery-1.3.2', function($){

    FX.run('pagination', function(attrs){

        var $this = $(this);
        if (attrs.style === 'default'){
            FX.getCSS(FX.CSS_PATH + 'pagination.css');
            $this.addClass('zarkfx_pagination_default').html('');
        };

        var location_href = $.url(window.location.href);
        var this_page_num = location_href.param(attrs.para_name);
        if (this_page_num === undefined) this_page_num = attrs.start_from 
        else this_page_num = parseInt(this_page_num);

        // init pagination's html
        var pagination_html = '<ul>';
        var start = Math.max(0, this_page_num - Math.ceil(attrs.displaycount/2));
        var end   = start + attrs.displaycount;
        if(end > attrs.max){
            end = attrs.max;
            start = Math.max(0, attrs.max - attrs.displaycount);
        }

        if (this_page_num !== 1){
            pagination_html += '<li zarkfx_page_num="1">'+attrs.firsttext+'</li>';
        }else{
            pagination_html += '<li >'+attrs.firsttext+'</li>';
        }

        for(var i=start;i<end;i++){
            if (i+1==this_page_num){
                pagination_html += '<li class="zarkfx_pagination_current_page">'+(i+1)+'</li>';
            }else{
                pagination_html += '<li zarkfx_page_num="'+(i+1)+'" >'+(i+1)+'</li>';
            }
        }

        if (this_page_num !== attrs.max){
            pagination_html += '<li zarkfx_page_num="'+attrs.max+'">'+attrs.lasttext+'</li>';
        }else{
            pagination_html += '<li>'+attrs.lasttext+'</li>';
        }

        pagination_html += '</ul>'
        $this.append(pagination_html);

        // bind click event
        $('li', $this).each(function(){
            var li_page_num = $(this).attr('zarkfx_page_num');
            if (li_page_num && (this_page_num.toString() !== li_page_num)){
                var new_href = location_href.setparam(attrs.para_name, li_page_num);
                if (attrs.plusToSpace){
                    new_href = new_href.replace(/\+/g,' ').replace(/\%2B/g,' ');
                }
                $(this).html('<a href="'+new_href+'">'+$(this).html()+'</a>');
            }else{
                $(this).html('<a href="">'+$(this).html()+'</a>');
            };
        });
    
    }, {
        max         :  10,
        displaycount:  10,
        firsttext   :  'first',
        lasttext    :  'last',
        style       :  'none',
        para_name   :  'page_num',
        start_from  :  1,
        plusToSpace :  true
    }, 'url');

});
