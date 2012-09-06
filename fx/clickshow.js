/*
   本fx已经弃用, 请使用toggle代替
 *
 * */

FX.getFrame('jquery-1.3.2', function($){
    FX.run('clickshow', function(attrs){

        var $this = $(this);
        if(attrs.showid !== undefined){
            $this.click(function(){
                if ( $('#'+attrs.showid).css('display') !== 'none' ){
                    $('#'+attrs.showid).hide();
                }else{
                    $('#'+attrs.showid).show();
                };
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
        };

        if (attrs.toggleHtml) {
            $.data(this, 'old_value', $this.html());
        };

    }, {
        toggleHtml: undefined
    });
});

