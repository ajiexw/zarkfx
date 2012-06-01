FX.getFrame('jquery-1.3.2', function($){

    FX.run('urlquery', function(attrs){

        var $this = $(this);
        var current_href = $.url(window.location.href),
            new_href = undefined;

        if (attrs.key && attrs.value){
            new_href = current_href.setparam(attrs.key, attrs.value);
        }else if(attrs.key){
            new_href = current_href.removeparam(attrs.key);
        }

        if ($this.attr('tagName') === 'A' && new_href){
            $this.attr('href', new_href);
        }
    
    }, {
        key         :  undefined,
        value       :  undefined
    }, 'url');

});

