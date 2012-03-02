ZARK_FX.getFrame('jquery-1.3.2', function($) {

    ZARK_FX.run('confirm', function(attrs) {

        $(this).click(function(){
            return confirm(attrs.msg);
        });

    }, {
        style:      'none',
        msg:        'Are you sure?'
    });

});
