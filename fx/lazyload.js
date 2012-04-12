// lazyload.js 不支持 jquery-.1.3.2

ZARK_FX.getFrame('jquery-1.5.1', function($){



    ZARK_FX.run('lazyload', function(attrs){

        var $this = $(this);
        $this.lazyload({
            skip_invisible: false,
            effect:         attrs.effect,
            effectspeed:    attrs.effectSpeed
        });

    
    }, {
        effectSpeed: 1000,
        effect:     'show'
    }, 'lazyload' );
});

