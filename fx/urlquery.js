FX.getFrame('jquery-1.3.2', function($){

    FX.run('urlquery', function(attrs){

        var $this = $(this);
        var current_url = $.url(window.location.href),
            current_href = window.location.href,
            new_href = undefined;

        if (attrs.key && attrs.value){
            new_href = current_url.setparam(attrs.key, attrs.value);
        }else if(attrs.key){
            new_href = current_url.removeparam(attrs.key);
        }

        if (attrs.chosedClass && (new_href === current_href)){
            $this.addClass(attrs.chosedClass);
        }

        if ($this.attr('tagName') === 'A' && new_href){
            $this.attr('href', new_href);
        }
    
    }, {
        key         :  undefined,
        value       :  undefined,
        chosedClass : 'chosed'
    }, 'url');

});

