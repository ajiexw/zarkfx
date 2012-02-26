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
            return;
        };

        var this_val = {this: this, is_valid: false, validate: undefined};
        var regex;

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
                regex = /.+/;

                break;

            case "notequal":
                if(attrs.value){
                    this_val.validate = function(){
                        return ZARK_FX.splitValue(attrs.value).indexOf($(this).val()) == -1;
                    };
                };

                break;

            case "identical":
                var another = $("#" + attrs["another_id"])[0];
                if(another){
                    this_val.validate = function(){
                        return this_val.this.value === another.value;
                    };
                };

                break;

            case "custom":
                if( !attrs["custom_fn"] ) {
                    return;
                };

                if(error_obj) {
                    this_val.success = function() {
                        this_val.is_valid = true;
                        $(error_obj).html("");
                    };
                    this_val.fail = function() {
                        this_val.is_valid = false;
                        $(error_obj).html(attrs["invalid_msg"]);
                    };
                } else {
                    this_val.success = function() {
                        this_val.is_valid = true;
                        if( attrs["valid_fn"] ) {
                            eval(attrs["valid_fn"] + ".call(this_val.this)");
                        };
                    };
                    this_val.fail = function() {
                        this_val.is_valid = false;
                        if( attrs["invalid_fn"] ) {
                            eval(attrs["invalid_fn"] + ".call(this_val.this)");
                        };
                    };
                };

                this_val.validate = function() {
                    eval(attrs["custom_fn"] +
                            '.call(this_val, "' + this_val.this.value + '")');
                };

                break;

            default:
                return;
        };

        if(!this_val.validate && regex) {
            this_val.validate = function(){
                return regex.test(this_val.this.value);
            };
        }else if(!this_val.validate){
            return;
        };

        $(this).change(function() {
            this_val.is_valid = false;
        });

        $(this).blur(function(){
            if(error_obj) {
                if( this_val.validate() ) {
                    this_val.is_valid = true;
                    $(error_obj).html("");
                } else {
                    this_val.is_valid = false;
                    $(error_obj).html(attrs["invalid_msg"]);
                };
            } else {
                if( this_val.validate() ) {
                    this_val.is_valid = true;
                    attrs["valid_fn"] && eval(attrs["valid_fn"] + ".call(this_val.this)");
                } else {
                    this_val.is_valid = false;
                    attrs["invalid_fn"] && eval(attrs["invalid_fn"] + ".call(this_val.this)");
                };
            };
        });

        // for submit
        var form = this.form;

        if( !$.data(form, "zarkfx.validation") ) {
            $.data(form, "zarkfx.validation", []);

            $(form).submit(function() {
                var data = $.data(form, "zarkfx.validation");
                for(var i in data) {
                    data[i].validate();
                    if( !data[i].is_valid ) {
                        return false;
                    };
                };
                return true;
            });
        };

        $.data(this.form, "zarkfx.validation").push(this_val);

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
