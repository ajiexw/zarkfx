from sphinx.directives import Directive, directives, addnodes
import re, sys

class Directive_ZarkFX(Directive):
    has_content = True
    option_spec = {
            "script": directives.flag,
            "demo": directives.flag,
            }

    def run(self):
        if self.options.has_key("script"):
            res = addnodes.nodes.raw( text=u"\n".join(self.content) )
            res.attributes["format"] = "html"
            return [res]
        elif self.options.has_key("demo"):
            blk = addnodes.nodes.container()
            blk.attributes["classes"] += ["zarkfx_demo"]

            blk += addnodes.nodes.paragraph(text=u"Result:")
            res = addnodes.nodes.raw( text=u"\n".join(self.content) )
            res.attributes["format"] = "html"
            blk += res

            blk += addnodes.nodes.paragraph(text=u"Source code:")
            src = addnodes.nodes.literal_block( text=u"\n".join(self.content) )
            blk += src

            return [blk]
        else:
            return []

def setup(app):
    app.add_directive("zarkfx", Directive_ZarkFX)
    app.add_stylesheet("zarkfx.css")
    app.add_javascript("zarkfx.js")
