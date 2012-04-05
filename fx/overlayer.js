
ZARK_FX.getFrame('jquery-1.3.2', function($){

    ZARK_FX.run('overlayer', function(attrs){

        if (attrs.target === 'screen'){
            var $this = $(this);
            $this.css('z-index', attrs.zindex);
            $this.css('background-color', attrs.backgroundcolor );
            
            // 如果是IE6 置为静止，覆盖全文档
            if(ZARK_FX.browser.ie6){ 
                $this.css('z-index', 0);
                $this.css('position', 'absolute');
                $this.height(document.body.clientHeight).width(document.body.clientWidth);
            }else {
                $this.css('position', 'fixed');
                $this.css('width', window.screen.availWidth);
                $this.css('height', window.screen.availHeight);
            }

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
