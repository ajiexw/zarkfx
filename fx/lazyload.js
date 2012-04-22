// lazyload.js 不支持 jquery-.1.3.2

FX.getFrame('jquery-1.5.1', function($){

    FX.run('lazyload', function(attrs){

        var $this = $(this);

        //在lazyload中, effect=show和effectspeed不能同时使用
        if (attrs.effect !== 'show'){
            attrs.effectspeed = attrs.effectSpeed;
        };
        delete attrs.effectSpeed;

        $this.lazyload(attrs);
    
    }, {
        skip_invisible: false,
        effectSpeed: 1000,
        effect:     'show' // 可选参数: show fadeIn
    }, 'lazyload' );
});

