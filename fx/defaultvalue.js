ZARK_FX.getFrame('jquery-1.3.2', function($){
    ZARK_FX.run('defaultvalue', function(attrs){
        if(attrs.value){
            if($(this).attr('tagName') === 'INPUT' && $(this).attr('type')==='radio'){
                $('input[name='+$(this).attr('name')+']').each(function(){
                    if($(this).attr('type') === 'radio' && $(this).val() === attrs.value) $(this).attr('checked', true);
                });
            }else{
                $(this).val(attrs.value)
            };
        };
    });
});
