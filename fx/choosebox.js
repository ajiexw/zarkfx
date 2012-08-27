FX.getFrame('jquery-1.3.2', function($){

    var getChoiceValue = function(choice){
        var selected_value = $(choice).val();
        if (!selected_value){
            selected_value = $(choice).attr('value');
        };
        if (!selected_value){
            selected_value = $(choice).html();
        };
        return selected_value;
    };

    var filterChoice = function(obj, $container, choice){
        var query = $.trim($(obj).val());
        if (query === ''){
            $(choice, $container).show();
        }else{
            $(choice, $container).each(function (){
                var choice_value = getChoiceValue(this);
                if (choice_value.indexOf(query) === -1){
                    $(this).hide();
                }else{
                    $(this).show();
                };
            });
        };
    };

    var openBox = function(attrs, $value){
        var $this = $('#'+attrs.boxid);

        $this.show();

        $(attrs.choice ,$this).unbind('click').click(function(){
            var selected_value = getChoiceValue(this);
            if (attrs.action === 'replace'){
                $value.val(selected_value);
            }else if(attrs.action === 'append'){
                if ($value.val() === ''){
                    $value.val(selected_value);
                }else{
                    $value.val($value.val() + attrs.delimiter + selected_value);
                };
            };
            if (attrs.triggerChange){
                $value.trigger('change');
            };
            $this.hide();
            $value.focus();
            return false;
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

        if (attrs.filter){
            $(attrs.filter).each(function(){
                var filter = this;
                window.setInterval(function(){filterChoice(filter, $this, attrs.choice);}, 300);
            });
        };

    };

    FX.run('choosebox', function(attrs){
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
            //console.warn('Zark Fx choosebox: miss boxid, ignore.');
        };

    }, {
        boxid:      undefined,
        choice:     'a',
        cancel:     undefined,
        action:     'replace',  // options: replace append
        escclose:   true,
        trigger:    undefined,
        delimiter:  '; ',
        triggerChange: true,
        filter:     undefined
    });

});
