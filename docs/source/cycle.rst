Cycle
=====

Example 1
---------

.. zarkfx:: :demo:

    <div fx="cycle[fx=fade;timeout=100]">
        <img src="http://cloud.github.com/downloads/malsup/cycle/beach1.jpg" width="200" height="200" />
        <img src="http://cloud.github.com/downloads/malsup/cycle/beach2.jpg" width="200" height="200" />
        <img src="http://cloud.github.com/downloads/malsup/cycle/beach3.jpg" width="200" height="200" />
    </div>

Example 2
---------

.. zarkfx:: :demo:

    <script type="text/javascript">
        var fx_var = {
            fx:"shuffle",
            timeout:5000,
        }
    </script>

    <div fx="cycle[fx_var=fx_var]">
        <img src="http://cloud.github.com/downloads/malsup/cycle/beach1.jpg" width="200" height="200" />
        <img src="http://cloud.github.com/downloads/malsup/cycle/beach2.jpg" width="200" height="200" />
        <img src="http://cloud.github.com/downloads/malsup/cycle/beach3.jpg" width="200" height="200" />
    </div>
