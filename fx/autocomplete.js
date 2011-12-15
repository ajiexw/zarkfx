/*
 * <input type="text" fx="autocomplete[data=adidas,adiwang,lining,nike]" />
 * <input type="text" fx="autocomplete[src=/api/getbrands]" />
 *
 * data和src只使用一个, 当两个同时指定时优先使用src
 *
 * src返回一纯text的文本,每行一个数据,比如:
 *      adidas
 *      adiwang
 *      lining
 *      nike
 * */

ZARK_FX.getFrame('jquery-1.3.2', function($){

    ZARK_FX.getCSS(ZARK_FX.CSS_PATH + 'jquery-autocomplete.css');

    ZARK_FX.run('autocomplete', function(attrs){

        var $this = $(this);
        var source;

        if (attrs.src !== undefined){
            $.ajax({
                async:      false,
                cache:      true,
                dataType:   'text',
                type:       'GET',
                url:        attrs.src,
                success:    function(data){
                    source = data.split('\n');
                }
            });
        }else if(attrs.data !== undefined){
            source = attrs.data.split(',');
        };
    
        $this.autocomplete(source, {
            autoFill        :  true,
            matchContains   :  true,
            mustMatch       :  true,
            scroll          :  false,
            selectFirst     :  true,
            matchSubset     :  false,
            max             :  10
        });

    }, {data:  undefined, src: undefined}, 'jquery-autocomplete' );

});
