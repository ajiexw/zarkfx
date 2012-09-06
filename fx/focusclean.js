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

FX.getFrame('jquery-1.3.2', function($){

    FX.run('focusclean', function(attrs){

        var $this = $(this);
        var old_value = $this.val();
        var old_color = $this.css('color');

        // 如果fx用于密码框, 则新建一个text在没有点击密码框时覆盖在原来的密码框上
        var on_password = attrs.onPassword && $this.attr('tagName') === 'INPUT' && $this.attr('type') === 'password';
        if (on_password){
            var $input_text = $('<input type="text" />').attr('class', $this.attr('class'));
            if (!attrs.notResume) $input_text.val(old_value);

            $input_text.focus(function(){
                $input_text.hide();
                $this.show();
                $this.focus();
            });
            $this.after($input_text);
            $this.hide();
            $input_text.css('color', attrs.color).show();
        };

        $this.focus(function(){
            if($this.val()==old_value){
                $this.val('');
                $this.css('color',old_color);
            };
        }).blur(function(){
            if($this.val()==''){
                $this.css('color',attrs.color);
                if (!attrs.notResume) $this.val(old_value);
                if (on_password){
                    $this.hide();
                    $input_text.show();
                };
            };
        });
        $this.css('color', attrs.color);
    

    }, {
        color:  '#666666',
        onPassword: false,
        notResume: false
    });

});
