// lazyload.js 不支持 jquery-.1.3.2

FX.getFrame('jquery-1.5.1', function($){
    var first = true;

    FX.run('lazyloadtemp', function(attrs){
        if (first){
            $('img[fx*=lazyload]').lazyload({skip_invisible:false, effect:'show'});
            first = false;
        }
    }, {
    }, 'lazyload' );
});

