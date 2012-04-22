
FX.getFrame('jquery-1.3.2', function($){

    if(FX.detect.browser === 'IE' && FX.detect.version === 6){ // ie6 hack
        
        var getScrollTop = function(){
            var scrollPos;
            if (typeof window.pageYOffset != 'undefined') {
                scrollPos = window.pageYOffset;
            }
            else if (typeof document.compatMode != 'undefined' &&
                document.compatMode != 'BackCompat') {
                    scrollPos = document.documentElement.scrollTop;
                }
            else if (typeof document.body != 'undefined') {
                scrollPos = document.body.scrollTop;
            };
            return scrollPos;
        };
    };

    FX.run('overlayer', function(attrs){

        if (attrs.target === 'screen'){
            var $this = $(this);
            $this.css('z-index', attrs.zindex);
            $this.css('background-color', attrs.backgroundcolor );
            
            // 如果是IE6 置为静止，覆盖全文档
            if(FX.detect.browser === 'IE' && FX.detect.version === 6){
                $this.css('z-index', 0);
                $this.css('position', 'absolute');
                $(window).scroll(function(){
                    $this.css('top', getScrollTop());
                });
                $this.height(document.documentElement.clientHeight).width(document.documentElement.clientWidth);
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
