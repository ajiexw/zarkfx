FX.getFrame('jquery-1.3.2', function($){

    if(FX.detect.browser === 'IE' && FX.detect.version === 6){ // ie6 hack
        FX.getCSS(FX.CSS_PATH + 'jquery-styleSelect/default-ie6.css');
    };

    FX.run('styleselect', function(attrs){
    
        var $this = $(this);

        if (attrs.jScrollPane){
            FX.getCSS(FX.CSS_PATH + 'jquery-styleSelect/' + attrs.style +'-jscrollpane.css');
        };

        FX.getCSS(FX.CSS_PATH + 'jquery-styleSelect/' + attrs.style +'.css');

        if (attrs.style === 'default'){
            attrs.styleClass = 'selectDark';
        }else{
            attrs.styleClass = attrs.style;
        };
        delete attrs.style;

		$this.styleSelect(attrs);
    
    }, {

        style: 'default',
        jScrollPane: 0,
        optionsTop: '31px',//弹出层距离顶部的高度
        optionsLeft: '0px',
        optionsWidth: 0,
        optionsHeight: 0,
        width: 0,
        height: 0,
        speed: 0,
        selectTrigger: 'change',
        jScrollPaneOptions: ''

    }, ['jquery-mousewheel', 'jquery-jscrollpane', 'jquery-styleSelect'] );

});
