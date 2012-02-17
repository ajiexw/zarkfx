#!/usr/bin/env python

import os, sys
from getopt import gnu_getopt

if __name__ == "__main__":
    def usage():
        print "Usage: {0:s} [-o output_file] input_file".format( \
                os.path.basename(sys.argv[0]) )
        sys.exit(-1)

    try:
        (opts, args) = gnu_getopt(sys.argv[1:], "o:")
    except:
        usage()

    fout = None
    for (k, v) in opts:
        if k == "-o":
            fout = v

    # prepare input file
    if len(args) > 0:
        try:
            fin = open(args[0])
        except Exception as err:
            print err
            sys.exit(-1)
    else:
        fin = sys.stdin

    # prepare output file
    if fout != None:
        try:
            fout = open(fout, "w")
        except Exception as err:
            print err
            sys.exit(-1)
    else:
        fout = sys.stdout

    doc_begin = "DOC_BEGIN\n"
    doc_end = "DOC_END\n"
    doc_inline = "DOC:"
    docs = []
    state = 0
    for line in fin:
        # change "\r\n" to "\n"
        if len(line) >= 2 and line[-2] == "\r":
            line = line[:-2] + "\n"

        if state == 0: # outside
            idx_inline = line.find(doc_inline)
            idx_begin = line.find(doc_begin)
            if idx_inline >= 0:
                fout.write(line[( idx_inline + len(doc_inline) ):])
            elif idx_begin >= 0 and \
                    idx_begin + len(doc_begin) == len(line):
                state = 1
        elif state == 1: # inside
            # for alignment, cut idx_begin chars at the beginning of line
            if len(line) < idx_begin + 1:
                line = "\n"
            else:
                line = line[idx_begin:]
            if line == doc_end:
                for line in docs:
                    fout.write(line)
                docs = []
                state = 0
            else:
                docs += line
