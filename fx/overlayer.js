
ZARK_FX.getFrame('jquery-1.3.2', function($){

    ZARK_FX.run('overlayer', function(attrs){

        if (attrs.target === 'screen'){
            var $this = $(this);
            $this.css('width', window.screen.availWidth);
            $this.css('height', window.screen.availHeight);
            $this.css('z-index', attrs.zindex);
            $this.css('background-color', attrs.backgroundcolor );
            $this.css('position', 'absolute');
            $this.css('top', 0);
            $this.css('left', 0);
            $this.css('opacity', 0.6);
        };

        if (attrs.autoshow === false){
            $this.hide();
        }else{
            $this.show();
        };

        if (attrs.scroll === false){
            $this.scroll(function(){ return false; });
        };

    }, {target:     'screen',
        autoshow:   false,
        zindex:     1000,
        backgroundcolor: '#000',
        opacity:    0.6,
        scroll:     false
    });

});
