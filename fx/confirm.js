FX.getFrame('jquery-1.3.2', function($) {

    FX.run('confirm', function(attrs) {
        var $this = $(this);

        if ($this.attr('onclick')){
            var old_click = $this.attr('onclick');
            $this.removeAttr('onclick').click(function(){
                if ( confirm(attrs.msg) ){
                    old_click && old_click.call(this);
                    return true;
                }else{
                    return false;
                };
            });
        }else{
            $this.click(function(){
                return confirm(attrs.msg);
            });
        };

    }, {
        style:      'none',
        msg:        'Are you sure?'
    });

});
