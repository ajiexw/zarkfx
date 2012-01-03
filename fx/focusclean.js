ZARK_FX.getFrame('jquery-1.3.2', function($){

    ZARK_FX.run('focusclean', function(attrs){

        var $this = $(this);
        var old_value = $this.val();
        var old_color = $this.css('color');
        $this.focus(function(){
            if($this.val()==old_value){
                $this.val('');
                $this.css('color',old_color);
            };
        }).blur(function(){
            if($this.val()==''){
                $this.css('color',attrs.tip_color);
                $this.val(old_value);
            };
        });
        $this.css('color',attrs.tip_color);
    
    }, {tip_color:  '#666666'} );
});
