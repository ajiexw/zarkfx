FX.getFrame('jquery-1.3.2', function($){
    FX.run('lenlimit', function(attrs){

        var $this = $(this),
            target, show_handle;

        if (attrs.tipTarget){
            target = $(attrs.tipTarget);
        }

        var showLimit = function(){
        
            var val = $this.val();

            if (attrs.len && val.length > attrs.len){
                $this.val($this.val().substr(0, parseInt(attrs.len)));
            }

            if (attrs.len && attrs.tipTarget){
                if ($(attrs.tipTarget).attr('tagName') === 'INPUT' || $(attrs.tipTarget).attr('tagName') === 'TEXTAREA'){
                    $(attrs.tipTarget).val( parseInt(attrs.len) - val.length);
                }else{
                    $(attrs.tipTarget).html( parseInt(attrs.len) - val.length);
                }
            }

        }

        $this.focus(function(){
            show_handle = window.setInterval(showLimit, 100);
        });

        $this.blur(function(){
            if (show_handle){
                window.clearInterval(show_handle);
            }
        });

    }, {
        len: undefined,
        tipTarget: undefined
    });
});
