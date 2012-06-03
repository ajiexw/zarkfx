// http://jqueryui.com/demos/position/#events

FX.getFrame('jquery-1.3.2', function($){

    FX.run('position', function(attrs){

        var $this = $(this);                 
        if (attrs.target){
            attrs.of = $(attrs.target);
            $this.position(attrs);
        }

    }, {            
        my       : 'center',
        at       : 'center',
        offset   : null,
        collision  : 'flip',
        target   : null

    }, 'jqueryui-1.8.14');

});
