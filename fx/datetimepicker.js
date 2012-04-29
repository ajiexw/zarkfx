FX.getFrame('jquery-1.3.2', function($){

    FX.run('datetimepicker', function(attrs){
    
        if (attrs.style === 'default'){
            FX.getCSS(FX.CSS_PATH + 'jqueryui/jqueryui-eggplant/jquery-ui-1.8.16.custom.css');
        }else if (attrs.style === 'overcast'){
            FX.getCSS(FX.CSS_PATH + 'jqueryui/jqueryui-overcast/jquery-ui-1.8.19.custom.css');
        };
        FX.getCSS(FX.CSS_PATH + 'jqueryui-addon/jquery-ui-timepicker-addon.css');

        if (attrs.language === 'chinese'){
            attrs.monthNamesShort = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        };

        var $this = $(this);
        attrs.defaultDate = $this.val();
        $this.datetimepicker(attrs)
    
    }, {
        language: 'english'

    }, ['jqueryui-1.8.14', 'jquery-datetimepicker/timepicker'] );

});

