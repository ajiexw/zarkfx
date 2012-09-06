FX.getFrame('jquery-1.3.2', function($){
    FX.run('appendto', function(attrs){

        var $this = $(this);

        if (attrs.target){
            $this.appendTo(attrs.target);
        };

    }, {
        target: undefined
    });

});

