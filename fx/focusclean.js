/*
 *
 * DOC_BEGIN
 *
 * Focus Clean
 * ===========
 *
 * 点击input时清空提示文字, 常用于搜索提示.
 *
 * 点击input清空文本
 * -----------------
 * fx="focusclean" 
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="focusclean" value="搜索..." style="width:300px" />
 *
 * 修改提示文本的颜色
 * ------------------
 * fx="focusclean[color=red]" 
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="focusclean[color=red]" value="搜索..." style="width:300px" />
 *
 * DOC_END
 *
 */

ZARK_FX.getFrame('jquery-1.3.2', function($){

    ZARK_FX.run('focusclean', function(attrs){

        var $this = $(this);
        var old_value = $this.val();
        var old_color = $this.css('color');
        $this.focus(function(){
            if($this.val()==old_value){
                $this.val('');
                $this.css('color',old_color);
            };
        }).blur(function(){
            if($this.val()==''){
                $this.css('color',attrs.color);
                $this.val(old_value);
            };
        });
        $this.css('color',attrs.color);
    
    }, {color:  '#666666'} );
});
