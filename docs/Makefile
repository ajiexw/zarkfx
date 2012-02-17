.PHONY: default all clean

default: all

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
AUTO_GENDIR   = source/auto_gen
BUILDDIR      = build

# Internal variables.
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(SPHINXOPTS) source

all:
	-make clean
	-mkdir -p source/auto_gen
	@ls ../fx/ | sed -n '/^.*.js$$/s|^\(.*\)\.js$$|./source/grab_doc.py ../fx/\1.js -o source/auto_gen/\1.rst|e'
	$(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

clean:
	-rm -rf $(BUILDDIR)/*
	-rm $(AUTO_GENDIR)/*.rst
