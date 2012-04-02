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

ZARK_FX.getFrame('jquery-1.3.2', function($) {

    ZARK_FX.run('validation', function(attrs) {

        var error_obj = $("#" + attrs["invalid_id"])[0];

        if(error_obj) {
            if( !attrs["invalid_msg"] ) {
                attrs["invalid_msg"] = "validate failed!";
            };
        }else if( !attrs["valid_fn"] && !attrs["invalid_fn"] ) {
            console.warn('zarkfx validation: error_obj is undefined');
            return;
        };

        var this_val = {pointer: this, validate: undefined, unvalidate: undefined};
        var regex;
        this_val.invalid_msg = attrs["invalid_msg"];
        this_val.error_obj = error_obj;

        switch(attrs["type"]) {
            case "numbers":
                regex = /^[0-9]+$/;

                break;

            case "email":
                regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

                break;

            case "regex":
                eval("regex = " + attrs["regex"]);
                if( !(regex instanceof RegExp) ) {
                    return;
                };

                break;

            case "notempty":
                this_val.validate = function(){
                    return $.trim($(this_val.pointer).val()).length > 0;
                };

                break;

            case "notequal":
                if(attrs.value){
                    this_val.validate = function(){
                        return ZARK_FX.splitValue(attrs.value).indexOf($.trim($(this_val.pointer).val())) == -1;
                    };
                };

                break;

            case "identical":
                var another = $("#" + attrs["another_id"])[0];
                if(another){
                    this_val.validate = function(){
                        
                        return this_val.pointer.value === another.value;
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
                            eval(attrs["valid_fn"] + ".call(this_val.pointer)");
                        };
                    };
                    this_val.fail = function() {
                        if( attrs["invalid_fn"] ) {
                            eval(attrs["invalid_fn"] + ".call(this_val.pointer)");
                        };
                    };
                };

                this_val.validate = function() {
                    return eval(attrs["custom_fn"] +
                            '.call(this_val, "' + this_val.pointer.value + '")');
                };

                break;

            default:
                return;
        };

        if(!this_val.validate && regex) {
            this_val.validate = function(){
                return regex.test(this_val.pointer.value);
            };
        }else if(!this_val.validate){
            return;
        };

        if(!this_val.error_obj && !attrs["valid_fn"] && !attrs["invalid_fn"] ) {
            return;
        };
        
        if(this_val.error_obj) {
            $(this_val.error_obj).hide();
            this_val.success = function(){
                $(this_val.error_obj).html("").hide();
            };
            this_val.fail = function(){
                $(this_val.error_obj).html(this_val.invalid_msg).show();
            };
        } else {
            if (attrs["valid_fn"]){
                this_val.success = function(){
                    attrs["valid_fn"] && eval(attrs["valid_fn"] + ".call(this_val.pointer)");
                };
            }else{
                this_val.success = function(){};
            };

            if (attrs["invalid_fn"]){
                this_val.fail = function(){
                    attrs["invalid_fn"] && eval(attrs["invalid_fn"] + ".call(this_val.pointer)");
                };
            }else{
                this_val.fail = function(){};
            };
        };

        $(this).blur(function(){
            if( this_val.validate() ) {
                this_val.success();
            } else {
                this_val.fail();
            };
        });

        // for submit
        var form = this.form;

        if (form){
            if( !$.data(form, "zarkfx.validation") ) {
                $.data(form, "zarkfx.validation", []);

                $(form).submit(function() {
                    var data = $.data(form, "zarkfx.validation");
                    for(var i in data) {
                        if (data[i].validate()){
                            data[i].success();
                        }else{
                            data[i].fail();
                            return false;
                        };
                    };
                    return true;
                });
            };

            $.data(form, "zarkfx.validation").push(this_val);
        
        };

    }, {
        type: undefined,

        regex: undefined,
        another_id: undefined,
        custom_fn: undefined,

        invalid_id: undefined,
        invalid_msg: undefined,

        valid_fn: undefined,
        invalid_fn: undefined
    });
});
