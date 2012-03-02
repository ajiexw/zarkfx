.. highlight:: javascript

.. _reStructuredText: http://docutils.sourceforge.net/rst.html

.. index::
    single: documentation
    single: docstring

Documentation How to
====================

ZARK FX supports documentation of `reStructuredText`_ format.
However, instead of writing stand-alone ``.rst`` files, we suggest
writing documents inside the source code files, since it's more
convenient to maintain.

Two sorts of in-source documenation mechanisms are supported,
*block documentation* and *inline documentation*.

.. index::
    single: block documentation

Block Documentation
-------------------

A docstring block is marked up by a pair of a ``DOC_BEGIN`` tag and
a ``DOC_END`` tag. Here is an example::

    ... source code ...

    // DOC_BEGIN
    // This is a ``docstring`` of `reStructuredText`_ format,
    //
    // .. zarkfx::
    //     :demo:
    //
    //     <div fx="demo[param=xxx]"></div>
    //
    // DOC_END

    ... source code ...

    /*
       DOC_BEGIN
       This is another ``docstring``
       DOC_END
     */

    ... source code ...

The code above produces the following `reStructuredText`_::

    This is a ``docstring`` of `reStructuredText`_ format,
    
    .. zarkfx::
        :demo:
    
        <div fx="demo[param=xxx]"></div>
    
    This is another ``docstring``

.. note::

    The ``DOC_END`` tag should be aligned with ``DOC_BEGIN``,
    or else the ``DOC_END`` takes no effect. Besides, both
    ``DOC_BEGIN`` and ``DOC_END`` should be followed by
    a line terminator "``\n``" or "``\r\n``".

Here is another example::

    ... source code ...

    /*
       DOC_BEGIN <-- This DOC_BEGIN takes no effect because
                     it's not followed by a line terminator.
       these    DOC_BEGIN
       chars
       are      ... docstrings ...
       ignored
       because    DOC_END
       they are   ^^^^^^^ This DOC_END takes no effect because
       in the             it's not aligned with the previous DOC_BEGIN.
       indent
       area.

         outsideinside

                DOC_END
     */

    ... source code ...

The code above produces:

.. parsed-literal::

    \

    ... docstrings ...

      DOC_END
      ^^^^^^^ This DOC_END takes no effect because
              it's not aligned with the previous DOC_BEGIN.

    inside
    \

.. index::
    single: inline documentation

Inline Documentation
--------------------

An inline docstring is marked up by a ``DOC:`` tag.
The characters after the ``DOC:`` tag will be parsed as `reStructuredText`_,
including the leading spaces. For example, the following code ::

    ... source code ...

    // sth. not interesting DOC:docstring A

    ... source code ...

    // DOC:    docstring B
    //     ^^^^ These spaces will be reserved.
    //     DOC:  docstring C

    ... source code ...

will produces ::

    docstring A
        docstring B
      docstring C
