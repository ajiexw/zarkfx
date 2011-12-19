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
 *
 * jQuery Autocomplete URL: http://docs.jquery.com/Plugins/Autocomplete/autocomplete#url_or_dataoptions
 * */

ZARK_FX.getFrame('jquery-1.3.2', function($){

    ZARK_FX.getCSS(ZARK_FX.CSS_PATH + 'jquery-autocomplete.css');
    var source_cache = {};

    ZARK_FX.run('autocomplete', function(attrs){

        var $this = $(this);
        var source;

        if (attrs.src !== undefined){
            if (source_cache[attrs.src] === undefined){
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
                source_cache[attrs.src] = source;
            }else{
                source = source_cache[attrs.src];
            };
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
