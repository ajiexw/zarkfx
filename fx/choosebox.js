ZARK_FX.getFrame('jquery-1.3.2', function($){

    var openBox = function(attrs, $value){
        var $this = $('#'+attrs.boxid);

        $this.show();

        $(attrs.choice ,$this).unbind('click').click(function(){
            var selected_value = $(this).val();
            if (!selected_value){
                selected_value = $(this).html();
            };
            if (attrs.action === 'replace'){
                $value.val(selected_value);
            }else if(attrs.action === 'append'){
                if ($value.val() === ''){
                    $value.val(selected_value);
                }else{
                    $value.val($value.val() + '\t' + selected_value);
                };
            };
            $this.hide();
            $value.focus();
        });
    
        if(attrs.cancel){
            $(attrs.cancel).unbind('click').click(function(){
                $this.hide();
            });
        };

        if (attrs.escclose){
            $this.attr('tabindex', '1').keydown(function(event){
                if (event.keyCode === 27){
                    $this.hide();
                };
            }).focus();
        };

    };

    ZARK_FX.run('choosebox', function(attrs){
        var $this = $(this);
        var $switch;

        if (attrs.trigger !== undefined){
            $switch = $(attrs.trigger);
        }else{
            $switch = $this;
        };

        if (attrs.boxid !== undefined){
            $switch.click(function(){
                openBox(attrs, $this);
            });
        }else{
            console.warn('Zark Fx choosebox: miss boxid, ignore.');
        };


    }, {
        boxid:      undefined,
        choice:     'a',
        cancel:     undefined,
        action:     'replace',  // options: replace append
        escclose:   true,
        trigger:    undefined
    });

});
