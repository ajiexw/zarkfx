/*
 *
 *   <input type="text" fx="datepicker" />
 *
 *   注意:  需要引用jquerui的css
 *
 * */

ZARK_FX.getFrame('jquery-1.3.2', function($){

    ZARK_FX.run('datepicker', function(attrs){

        var $this = $(this);
        $this.datepicker({ dateFormat: 'yy-mm-dd', defaultDate: $this.val() })
    
    }, {}, 'jqueryui-1.8.14' );

});
