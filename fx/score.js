FX.getFrame('jquery-1.3.2', function($){
    FX.run('score', function(attrs){
        
        var $this = $(this);

        $this.find('> *').each(function(){
            var old_image = '';
            if (old_image === '' && $(this).attr('tagName') === 'IMG' && $(this).attr('src') ){
                old_image = $(this).attr('src');
            }
            if (old_image === '' && attrs.defaultImage ){
                old_image = attrs.defaultImage;
            }
            if (old_image){
                if ($(this).attr('tagName') === 'IMG'){
                    $(this).attr('src', old_image);
                }else{
                    $(this).css('background-image:', 'url(' + old_image + ')');
                }
            }
            $.data(this, 'zarkfx.score.old_image', old_image);
        });

        var setHover = function($obj, url){
            $obj.each(function(){
                if ($(this).attr('tagName') === 'IMG'){
                    $(this).attr('src', url);
                }else{
                    $(this).css('background-image:', 'url(' + url + ')');
                }
            });
        }
        
        var unsetHover = function($obj){
            $obj.each(function(){
                var url = ''
                if ($.data(this, 'zarkfx.score.chosed_image')){
                    url = $.data(this, 'zarkfx.score.chosed_image');
                }else{
                    url = $.data(this, 'zarkfx.score.old_image');
                }
                if ($(this).attr('tagName') === 'IMG'){
                    $(this).attr('src', url);
                }else{
                    $(this).css('background-image:', 'url(' + url + ')');
                }
            });
        }

        var setText = function($obj, text){
            $obj.each(function(){
                var value_tag_name = $(this).attr('tagName');
                if (value_tag_name === 'INPUT' || value_tag_name === 'TEXTAREA'){
                    $(this).val(text);
                }else{
                    $(this).html(text);
                }
            });
        }

        if(typeof attrs.hoverImage !== 'undefined'){
            $this.find('> *').each(function(){
                var old_src = $(this).attr('src');
                $(this).hover(function(){
                    setHover($(this).add( $(this).prevAll() ), attrs.hoverImage);
                }, function(){
                    unsetHover($(this).add( $(this).prevAll() ));
                });
            });
        };

        if(typeof attrs.chosedImage !== 'undefined'){
            $this.find('> *').click(function(){
                $this.find('> *').each(function(){
                    $.data(this, 'zarkfx.score.chosed_image', '');
                });

                $(this).add($(this).prevAll()).each(function(){
                    $.data(this, 'zarkfx.score.chosed_image', attrs.chosedImage);
                });

                unsetHover($this.find('> *'));

                // set chosed value to anthor tag
                if (typeof attrs.valueId !== 'undefined'){
                    var val=null;
                    if (!val && $(this).val() ){
                        val = $(this).val();
                    }
                    if (!val && $(this).attr('value') ){
                        val = $(this).attr('value');
                    }
                    if (val){
                        setText($('#'+attrs.valueId), val);
                    }
                }

            });

        };

        // set chosed text to anthor tag
        if (typeof attrs.textId !== 'undefined'){
            $this.find('> *').hover(function(){
                var text=null;
                if (!text && $(this).attr('text') ){
                    text = $(this).attr('text');
                }
                if (!text && $(this).val() ){
                    text = $(this).val();
                }
                if (!text && $(this).attr('value') ){
                    text = $(this).attr('value');
                }
                if (text){
                    setText($('#'+attrs.textId), text);
                }
            }, function(){
                setText($('#'+attrs.textId), '');
            });
        }

    }, {
        defaultImage:        undefined,
        hoverImage:   undefined,
        chosedImage:   undefined,
        valueId:    undefined,
        textId:    undefined
    });

});
