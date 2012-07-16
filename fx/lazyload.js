// lazyload.js 不支持 jquery-.1.3.2

FX.getFrame('jquery-1.5.1', function($){

    FX.run('lazyload', function(attrs){

    
    }, {
        skip_invisible: false,
        effectSpeed: 1000,
        effect:     'show' // 可选参数: show fadeIn
    }, 'lazyload' );

    $('img[fx*=lazyload]').lazyload({skip_invisible:false, effect='show'});
});

