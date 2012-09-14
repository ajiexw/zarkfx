FX.getFrame('jquery-1.3.2', function($){

    var getOverlayHtml = function(uuid){
        return '<div id="' + uuid + '"  style="float:left;position:relative" ><div id="' + uuid + '_button" style="width:100%;height:100%;"></div></div>'
    }


    FX.run('zeroclipboard', function(attrs){
        var $this = $(this),
            uuid = FX.getJSC();

        var $overlay = $(getOverlayHtml(uuid));
        $overlay.width($this.width()).height($this.height());
        $this.wrap($overlay);

        ZeroClipboard.setMoviePath( FX.SWF_PATH + 'ZeroClipboard.swf' ); 
        CLIPBOARD = new ZeroClipboard.Client(); 
        CLIPBOARD.setHandCursor(true); 
        CLIPBOARD.glue(uuid + '_button', uuid); 

        var copy_text = ''
        if (typeof attrs.target !== 'undefined'){
            copy_text = $(attrs.target).val();
            $(attrs.target).bind('change', function(){
                CLIPBOARD.setText($(attrs.target).val());
            });
        }else{
            copy_text = attrs.text;
        };

        CLIPBOARD.setText(copy_text);

        CLIPBOARD.addEventListener( 'onMouseDown', function(){
            if (typeof attrs.toggleHtml !== 'undefined'){
                $this.html(attrs.toggleHtml);
            }
        });

    }, {
        target: undefined,
        text: '',
        toggleHtml: undefined

    }, 'zeroclipboard');

});
