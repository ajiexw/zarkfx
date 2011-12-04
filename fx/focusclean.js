ZARK_FX.focusclean = {};
ZARK_FX.focusclean.tip_color = '#CDCDCD';

$('input['+ZARK_FX.FX+']').each(function(){
    var $this = $(this);
    if (ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).focusclean !== undefined){
        var old_value = $this.val();
        var old_color = $this.css('color');
        $this.focus(function(){
            if($this.val()==old_value){
                $this.val('');
                $this.css('color',old_color);
            };
        }).blur(function(){
            if($this.val()==''){
                $this.css('color',ZARK_FX.focusclean.tip_color);
                $this.val(old_value);
            };
        });
        $this.css('color',ZARK_FX.focusclean.tip_color);
    };
});
