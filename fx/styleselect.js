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
        jScrollPane: 1

    }, ['jquery-mousewheel', 'jquery-jscrollpane', 'jquery-styleSelect'] );

});
