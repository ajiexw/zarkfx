/*
    <pre fx="firstchar[class=big]">abcd</pre>

    <pre fx="firstchar[class=big]">传说中....</pre>
 *
 * */

FX.getFrame('jquery-1.3.2', function($){

    FX.run('firstchar', function(attrs){

        var $this = $(this);
        if (attrs.class){
            var content = $this.html();
            $this.html('<span class="'+attrs.class+'">'+content[0]+'</span>'+content.substr(1));
        };
    
    }, {
        class: undefined
    } );
});

