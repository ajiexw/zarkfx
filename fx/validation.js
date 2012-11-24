/*
 * DOC_BEGIN
 *
 * Validation
 * ==========
 *
 * .. zarkfx:: :demo:
 *
 *     <script type="text/javascript">
 *         var regex_email = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
 *
 *         function check_user(text) {
 *             if( /^(xdcr|sdjl|davinwang)$/i.test(text) )
 *                 setTimeout(this.success, 1000);
 *             else
 *                 setTimeout(this.fail, 1000);
 *         }
 *
 *         function custom_valid() {
 *             alert("custom_valid is called: " + this.value);
 *         }
 *
 *         function custom_invalid() {
 *             this.value = "custom_invalid is called";
 *         }
 *     </script>
 *
 *     <form>
 *         <table>
 *             <tr>
 *                 <td>User name:</td>
 *                 <td><input fx="validation[type=custom;custom_fn=check_user;invalid_id=out;invalid_msg=Invalid&nbsp;user&nbsp;name!]" /></td>
 *             </tr>
 *             <tr>
 *                 <td>Password:</td>
 *                 <td><input type="password" id="password" /></td>
 *             </tr>
 *             <tr>
 *                 <td>Confirm password:</td>
 *                 <td><input type="password" fx="validation[type=identical;another_id=password;invalid_id=out;invalid_msg=The&nbsp;two&nbsp;passwords&nbsp;are&nbsp;not&nbsp;identical!]" /></td>
 *             </tr>
 *             <tr>
 *                 <td>Email:</td>
 *                 <td><input fx="validation[type=regex;regex=regex_email;invalid_id=out;invalid_msg=Invalid&nbsp;email&nbsp;address!]" /></td>
 *             </tr>
 *             <tr>
 *                 <td>Numbers:</td>
 *                 <td><input fx="validation[type=numbers;valid_fn=custom_valid;invalid_fn=custom_invalid]" /></td>
 *             </tr>
 *             <tr>
 *                 <td><input type="submit" value="submit" /></td>
 *             </tr>
 *         </table>
 *     </form>
 *     <hr />
 *     <p id="out"></p>
 *
 * DOC_END
 *
 */

FX.getFrame('jquery-1.3.2', function($) {

    FX.run('validation', function(attrs) {

        var $this = $(this);
        // 获得错误提示的对象
        var error_obj = $("#" + attrs["invalid_id"])[0];

        // 当有错误提示对象时必须同时有错误提示消息
        if(error_obj) {
            if( !attrs["invalid_msg"] ) {
                attrs["invalid_msg"] = "validate failed!";
            };
        // 如果没有错误提示对象, 且也没有错误处理函数, 则此validation被忽略
        }else if( !attrs["invalid_fn"] ) {
            if (typeof console !== 'undefined') console.warn('zarkfx validation: error_obj is undefined');
            return;
        };

        var this_val = {node: this, validate: undefined, attrs: attrs}, // 当前验证对象, node是原始html的dom, validate为验证函数
            regex;  // 正则表达式, 当不指明验证函数validate时, 自动有regex生成validate

        this_val.invalid_msg = attrs["invalid_msg"];  // 错误提示
        this_val.error_obj = error_obj; // 提示错误的元素

        // 根据验证类型的到不同的validate或regex
        switch(attrs["type"]) {
            case "numbers":
                if(attrs.nonnegative){
                    if(attrs.empty){
                        regex = /(^[0-9]+$)|(^$)/;
                    }else{
                        regex = /^[0-9]+$/;
                    }
                }else{
                    if(attrs.empty){
                        regex = /(^-?[0-9]+$)|(^$)/;
                    }else{
                        regex = /^-?[0-9]+$/;
                    }
                }

                break;

            case "email":
                regex = /^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

                break;

            case "domain":
                regex = /^[a-zA-Z0-9_-]+$/;

                break;

            case "chinamobile":
                regex= /^1[0-9]{10}$|^$/;
                break;

            case "regex":
                eval("regex = /" + attrs["regex"] +"/");
                
                if( !(regex instanceof RegExp) ) {
                    return;
                };

                break;

            case "notempty":
                this_val.validate = function(){
                    return $.trim($(this_val.node).val()).length > 0;
                };

                break;

            case "notequal":
                if(attrs.value || (typeof attrs.defaultValue !== 'undefined')){
                    var old_value;
                    if (typeof attrs.defaultValue !== 'undefined'){
                        old_value = $this.val();
                    }else{
                        old_value = FX.splitValue(attrs.value);
                    }

                    this_val.validate = function(){
                        var match;
                        match = $.trim($(this_val.node).val());
                        if (attrs.ignorecase){
                            old_value = old_value.toLowerCase();
                            match = match.toLowerCase();
                        };
                        return old_value.indexOf(match) === -1;
                    };
                };

                break;

            case "minlen":
                this_val.validate = function(){
                    return $.trim($(this_val.node).val()).length >= parseInt(attrs.len);
                };

                break;

            case "maxlen":
                this_val.validate = function(){
                    return $.trim($(this_val.node).val()).length <= parseInt(attrs.len);
                };

                break;

            case "filesize":
                this_val.validate = function(){
                    var $node = $(this_val.node);
                    if ($node.attr('tagName') === 'INPUT' && $node.attr('type') === 'file'){
                        if (attrs.max){
                            if ($node[0].files[0].size > parseInt(attrs.max)) return false;
                        };
                        if (attrs.min){
                            if ($node[0].files[0].size < parseInt(attrs.min)) return false;
                        };
                        
                    };
                    return true;
                };

                break;

            case "identical":
                var another = $("#" + attrs["another_id"])[0];
                if(another){
                    this_val.validate = function(){
                        var value = this.node.value,
                            match = another.value;
                        if (attrs.ignorecase){
                            value = value.toLowerCase();
                            match = match.toLowerCase();
                        };
                        return value === match;
                    };
                };

                break;

            case "endswith":
                var values;
                if (typeof attrs.values !== 'undefined'){
                    values = FX.splitValue(attrs.values);
                }else{
                    values = [];
                };
                this_val.validate = function(){
                    var i = 0,
                        value = $this.val();
                    if (value.length === 0){
                        return true;
                    }else{
                        for ( ; i < values.length; i++){
                            var type = $.trim(values[i]);
                            if (attrs.ignorecase){
                                value = value.toLowerCase();
                                type = type.toLowerCase();
                            };
                            if (value.indexOf(type) + type.length === value.length){
                                return true;
                            };
                        };
                        return false;
                    };
                };

                break;

            case "startswith":
                var values;
                if (typeof attrs.values !== 'undefined'){
                    values = FX.splitValue(attrs.values);
                }else{
                    values = [];
                };
                this_val.validate = function(){
                    var i = 0,
                        value = $this.val();
                    if (value.length === 0){
                        return true;
                    }else{
                        for ( ; i < values.length; i++){
                            var type = $.trim(values[i]);
                            if (attrs.ignorecase){
                                value = value.toLowerCase();
                                type = type.toLowerCase();
                            };
                            if (value.indexOf(type) === 0){
                                return true;
                            };
                        };
                        return false;
                    };
                };

                break;

            case "custom":
                if( !attrs["custom_fn"] ) {
                    return;
                };

                if(this_val.error_obj) {
                    this_val.success = function() {
                        $(this_val.error_obj).html("");
                    };
                    this_val.fail = function() {
                        $(this_val.error_obj).html(this_val.invalid_msg);
                    };
                } else {
                    this_val.success = function() {
                        if( attrs["valid_fn"] ) {
                            eval(attrs["valid_fn"] + ".call(this_val.node, this_val.attrs)");
                        };
                    };
                    this_val.fail = function() {
                        if( attrs["invalid_fn"] ) {
                            eval(attrs["invalid_fn"] + ".call(this_val.node, this_val.attrs)");
                        };
                    };
                };

                this_val.validate = function() {
                    return eval(attrs["custom_fn"] +
                            '.call(this_val, "' + this_val.node.value + '")');
                };

                break;

            default:
                return;
        };

        // 如果没有validate的话就用regex生成validate
        if(!this_val.validate && regex) {
            this_val.validate = function(){
                return regex.test(this_val.node.value);
            };
        }else if(!this_val.validate){
            return;
        };

        // 如果使用错误提示对象, 则在验证成功和失败时修改对象的提示值
        if(this_val.error_obj) {
            $(this_val.error_obj).hide();
            this_val.success = function(){
                $(this_val.error_obj).html("").hide();
            };
            this_val.fail = function(){
                $(this_val.error_obj).html(this_val.invalid_msg).show();
            };
        // 否则运行valid_fn和invalid_fn函数
        } else {
            if (attrs["valid_fn"]){
                this_val.success = function(){
                    attrs["valid_fn"] && eval(attrs["valid_fn"] + ".call(this_val.node, this_val.attrs)");
                };
            }else{
                this_val.success = function(){};
            };

            if (attrs["invalid_fn"]){
                this_val.fail = function(){
                    attrs["invalid_fn"] && eval(attrs["invalid_fn"] + ".call(this_val.node, this_val.attrs)");
                };
            }else{
                this_val.fail = function(){};
            };
        };

        // 失焦时验证
        if (attrs.blurValidate){
            if( !$.data(this, "zarkfx.input_validations") ) {
                $.data(this, "zarkfx.input_validations", []);

                var thisValidation = function(){
                    var val_functions = $.data(this, "zarkfx.input_validations"),
                        i = 0;
                    for( ; i < val_functions.length; i++){
                        if (!val_functions[i]()){
                            return false;
                        };
                    };
                }

                if ($this.attr('tagName') === 'INPUT' && $this.attr('type') === 'file'){
                    $this.change(thisValidation);
                }else{
                    $this.blur(thisValidation);
                };

            };

            $.data(this, "zarkfx.input_validations").push(function(){
                if( this_val.validate() ) {
                    this_val.success();
                    return true;
                } else {
                    this_val.fail();
                    return false;
                };
            });

        };

        // form提交时验证
        if (attrs.submitValidate){
            var form = this.form;

            if (form){
                if( !$.data(form, "zarkfx.validations") ) {
                    $.data(form, "zarkfx.validations", []);

                    $(form).submit(function() {
                        var data = $.data(form, "zarkfx.validations"),
                            success = true;
                        for(var i in data) {
                            if (data[i].validate()){
                                data[i].success();
                            }else{
                                data[i].fail();
                                if (!attrs.checkAll){
                                    return false;
                                }else{
                                    success = false;
                                };
                            };
                        };
                        return success;
                    });
                };
                $.data(form, "zarkfx.validations").push(this_val);
            };

        };

        if (attrs.trigger){
            $(attrs.trigger).each(function(){
                var $this = $(this);
                if( !$.data(this, "zarkfx.validations") ) {
                    $.data(this, "zarkfx.validations", []);

                    $this.click(function() {
                        var data = $.data(this, "zarkfx.validations"),
                            success = true;
                        for(var i in data) {
                            if (data[i].validate()){
                                data[i].success();
                            }else{
                                data[i].fail();
                                if (!attrs.checkAll){
                                    return false;
                                }else{
                                    success = false;
                                };
                            };
                        };
                        return success;
                    });
                };
                $.data(this, "zarkfx.validations").push(this_val);
            });
        };

    }, {
        type: undefined,
        trigger: undefined,

        regex: undefined,
        another_id: undefined,
        custom_fn: undefined,

        invalid_id: undefined,
        invalid_msg: undefined,

        valid_fn: undefined,
        invalid_fn: undefined,
        blurValidate: true,
        submitValidate: true,
        ignorecase: false,
        checkAll:   false,
        nonnegative: false
    });
});
