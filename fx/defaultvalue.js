
ZARK_FX.getFrame('jquery-1.3.2', function($){
    ZARK_FX.run('defaultvalue', function(attrs){
        if(attrs.value) $(this).val(attrs.value);
    });
});
