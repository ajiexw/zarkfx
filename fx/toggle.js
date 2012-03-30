ZARK_FX.getFrame('jquery-1.3.2', function($){
    ZARK_FX.run('toggle', function(attrs){

        var $this = $(this);
        if(attrs.target !== undefined){
            $this.bind(attrs.on, function(){
                $(attrs.target).each(function(){
                    if ( $(this).css('display') !== 'none' ){
                        $(this).hide();
                    }else{
                        $(this).show();
                    };
                });

                if (attrs.hideme) {
                    $this.hide();
                };

                if (attrs.hideid) {
                    $('#'+attrs.hideid).hide();
                };

                if (attrs.toggleHtml) {
                    if($this.html() === $.data(this, 'old_value')){
                        $this.html(attrs.toggleHtml);
                    }else{
                        $this.html($.data(this, 'old_value'));
                    };
                };

            });

            if (attrs.toggleHtml) {
                $.data(this, 'old_value', $this.html());
            };

        };

    }, {
        on: 'click',
        target: undefined,
        hideme: false,
        hideid: undefined,
        toggleHtml: undefined
    });
});


