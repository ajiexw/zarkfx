/*
 *
 * DOC_BEGIN
 *
 * Auto Complete
 * =============
 *
 * 自动完成. (本FX基于 `jQuery Autocomplete <http://docs.jquery.com/Plugins/Autocomplete/autocomplete#url_or_dataoptions>`_ 开发)
 *
 * 直接输入备选项
 * --------------
 * fx="autocomplete[data=adidas,adiwang,lining,nike]"
 *
 * 在下面的输入框中键入一个a试试
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="autocomplete[data=adidas,adiwang,lining,nike]" />
 *
 * 使用文件
 * --------
 * fx="autocomplete[src=../../../file/autocomplete/languages]"
 *
 * languages文件中每个备选项独占一行
 *
 * .. zarkfx:: :demo:
 *
 *     <input type="text" fx="autocomplete[src=../../../file/autocomplete/languages]" />
 *
 *
 * DOC_END
 *
 */

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
