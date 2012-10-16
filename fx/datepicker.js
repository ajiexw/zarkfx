/*
 *
 * DOC_BEGIN
 *
 * Date picker
 * ===========
 *
 * 日期选择
 *
 * 默认样式
 * --------
 * fx="datepicker[style=default]" 
 *
 * 点击下面的输入框, 出现日期选择工具.
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="datepicker[style=default]" />
 *
 * DOC_END
 *
 */

FX.getFrame('jquery-1.3.2', function($){

    FX.run('datepicker', function(attrs){
    
        if (attrs.style === 'default'){
            FX.getCSS(FX.CSS_PATH + 'jqueryui/jqueryui-eggplant/jquery-ui-1.8.16.custom.css');
        }else if (attrs.style === 'overcast'){
            FX.getCSS(FX.CSS_PATH + 'jqueryui/jqueryui-overcast/jquery-ui-1.8.19.custom.css');
        };

        if (attrs.language === 'chinese'){
            attrs.monthNamesShort = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        };

        var $this = $(this);
        attrs.defaultDate = $this.val();
        $this.datepicker(attrs);
        $this.datepicker('option', 'yearRange', '-47:+1');
    
    }, {

        style: 'none',
        dateFormat: 'yy-mm-dd',
        language: 'english'

    }, 'jqueryui-1.8.14' );

});
