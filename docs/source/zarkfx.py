from sphinx.directives import Directive, directives, addnodes
#from xml.dom import minidom
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

            blk += addnodes.nodes.paragraph(text=u"Source code:")
            src = addnodes.nodes.literal_block( text=u"\n".join(self.content) )
            blk += src

            blk += addnodes.nodes.paragraph(text=u"Result:")
            #try:
            #    t = ( u"".join(self.content) ).encode("utf-8")
            #    dom = minidom.parseString(t)
            #    xml = dom.toxml() + u"\n"
            #    xml = re.sub(r'^<\?.*?\?>', "", xml)
            #except Exception as err:
            #    begin = err.offset - 10
            #    end = err.offset + 40
            #    if begin < 0:
            #        begin = 0
            #    if end > len(t):
            #        end = len(t)
            #    sys.stderr.write("\x1B[31;1m" + str(err) + ":\x1B[0m\n")
            #    sys.stderr.write('    "...' + t[begin:end] + '..."\n');
            #    sys.stderr.write("        " + " "*(err.offset - begin) + "^\n");
            #    xml = u"Illegal statements\n"
            #res = addnodes.nodes.raw(text=xml)
            res = addnodes.nodes.raw( text=u"\n".join(self.content) )
            res.attributes["format"] = "html"
            blk += res

            return [blk]
        else:
            return []

def setup(app):
    app.add_directive("zarkfx", Directive_ZarkFX)
    app.add_stylesheet("zarkfx.css")
    app.add_javascript("zarkfx.js")
