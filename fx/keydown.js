ZARK_FX.getFrame('jquery-1.3.2', function($){

    ZARK_FX.run('keydown', function(attrs){

        var $this = $(this);
        if (attrs.key && attrs.target){
            var key_code;
            if (attrs.key === 'enter'){
                key_code = 13;
            }else if (attrs.key === 'esc'){
                key_code = 27;
            };

            if (key_code){
                $this.keydown(function(event){
                    if (event.keyCode === key_code){
                        eval('$(\''+attrs.target+'\').'+attrs.action+'()');
                    };
                });
            };
        };
    
    }, {
        key:    undefined,
        action: 'click',
        target: undefined
    } );
});

