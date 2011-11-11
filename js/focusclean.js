$('input['+ZARK_FX.fx+']').each(function(){
    var $this = $(this);
    if (ZARK_FX.parserFx($this.attr(ZARK_FX.fx)).focusclean !== undefined){
        var old_value = $this.val();
        $this.focus(function(){
            if($this.val()==old_value){
                $this.val('');
            };
        }).blur(function(){
            if($this.val()==''){
                $this.val(old_value);
            };
        });
    };
});
