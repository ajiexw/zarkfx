var first_dom = true;
$('a['+ZARK_FX.fx+']').each(function(){
    var $this = $(this);
    if (ZARK_FX.parserFx($this.attr(ZARK_FX.fx)).switchdiv !== undefined){
        $this.click(function(){
            $this.blur();
            $('a['+ZARK_FX.fx+']').each(function(){
                $($(this).attr('href')).hide();
                $(this).addClass('unchosed').removeClass('chosed');
            });
            $($this.attr('href')).show();
            $this.addClass('chosed').removeClass('unchosed');
            return false;
        });
    };
    if (first_dom){
        $this.addClass('chosed').removeClass('unchosed');
        $($this.attr('href')).show();
        first_dom = false;
    }else{
        $($(this).attr('href')).hide();
        $(this).addClass('unchosed').removeClass('chosed');
    };
});
