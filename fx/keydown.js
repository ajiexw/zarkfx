FX.getFrame('jquery-1.3.2', function($){

    FX.run('keydown', function(attrs){

        var $this = $(this);
        if (attrs.key && attrs.target){
            var key_code, ctrl=null, alt=null, shift=null;

            if (attrs.key === 'enter'){
                key_code = 13;
            }else if (attrs.key === 'esc'){
                key_code = 27;
            }else if (attrs.key === 'ctrl+enter'){
                key_code = 13;
                ctrl = true;
            };

            if (key_code){
                $this.keydown(function(event){
                    if (event.keyCode === key_code 
                        && ( ctrl === null  || event.ctrlKey === ctrl) 
                        && ( alt === null   || event.altKey === alt) 
                        && ( shift === null || event.shiftKey === shift)){
                        eval('$(\''+attrs.target+'\').'+attrs.action+'()');
                    };
                });
                if ($this.attr('tagName') === 'DIV' && ($this.attr('tabindex') === undefined)){
                    $this.attr('tabindex', 1);
                };
            };

        };
    
    }, {
        key:    undefined,
        action: 'click',
        target: undefined
    } );
});

