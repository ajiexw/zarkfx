ZARK_FX.getFrame('jquery-1.3.2', function($){

    var openBox = function(attrs, $value){
        var $this = $('#'+attrs.boxid);

        $this.show();


        $(attrs.choice ,$this).unbind('click').click(function(){
            var val = $(this).val();
            if (!val){
                val = $(this).html();
            };
            $value.val(val);
            $this.hide();
            $value.focus();
        });
    
        if(attrs.cancel){
            $(attrs.cancel).unbind('click').click(function(){
                $this.hide();
            });
        };

    };

    ZARK_FX.run('choosebox', function(attrs){
        var $this = $(this);
        var $switch;

        if (attrs.switchid !== undefined){
            $switch = $('#'+attrs.switchid);
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
        switchid: undefined,
        boxid: undefined,
        choice:     'a',
        cancel:  undefined
    });

});
