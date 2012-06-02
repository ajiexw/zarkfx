FX.getFrame('jquery-1.3.2', function($){

    FX.run('urlquery', function(attrs){
        var $this = $(this),
            href;

        if ($this.attr('tagName') === 'A'){

            
            if ($this.attr('href')){
                href = $this.attr('href');
            }else{
                href = window.location.href;
            }

            var url = $.url(href),
                new_href = undefined,
                current_url = $.url(window.location.href),
                current_href = window.location.pathname + window.location.search;
            


            if (attrs.key && attrs.value){
                new_href = url.setparam(attrs.key, attrs.value);
            }else if(attrs.currentValue){
                var current_value = current_url.param(attrs.key);
                if (typeof current_value !== 'undefined' &&  current_value.length>0){
                    new_href = url.setparam(attrs.key, current_value);
                }
            }else if(attrs.key){
                new_href = url.removeparam(attrs.key);
            }

            if (attrs.quote){
                new_href = encodeURI(new_href);
            }

            if (new_href){
                if (attrs.chosedClass && (new_href === current_href)){
                    alert('ok')
                    $this.addClass(attrs.chosedClass);
                    alert(attrs.chosedClass)
                }

                $this.attr('href', new_href);
            }
        }
    
    }, {
        key         :  undefined,
        value       :  undefined,
        chosedClass : 'chosed',
        currentValue: false,
        quote       : false
    }, 'url');

});

