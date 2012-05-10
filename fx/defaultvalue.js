FX.getFrame('jquery-1.3.2', function($){
    FX.run('defaultvalue', function(attrs){
        var $this = $(this),
            $form;

        if (typeof this.form !== 'undefined'){
            $form = $(this.form);
        }else{
            $form = $('body');
        }

        if($(this).attr('tagName') === 'INPUT' && $(this).attr('type')==='radio'){

            var default_value;

            if(attrs.value){
                default_value = attrs.value;
            }else{
                default_value = $this.val();
            };

            $('input[name='+$this.attr('name')+'][type=radio]', $form).each(function(){
                if ($(this).val() === default_value){
                    $(this).attr('checked', true);
                };
            });

        }else{
            if(attrs.value){
                $this.val(attrs.value)
            };
        };

    }, {
        value: undefined
    });
});
