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

ZARK_FX.getFrame('jquery-1.3.2', function($){

    ZARK_FX.run('datepicker', function(attrs){
    
        if (attrs.style === 'default'){
            ZARK_FX.getCSS(ZARK_FX.CSS_PATH + 'jqueryui/jqueryui-eggplant/jquery-ui-1.8.16.custom.css');
        };

        var $this = $(this);
        $this.datepicker({ dateFormat: 'yy-mm-dd', defaultDate: $this.val() })
    
    }, {style: 'none'}, 'jqueryui-1.8.14' );

});
