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

    doc_inline = "DOC:"
    doc_begin = "DOC_BEGIN\n"
    doc_end = "DOC_END\n"

    # commands
    cmd_tab_width = "TAB_WIDTH:"
    cmd_cut_off = "CUT_OFF:"

    tab_width = 4

    docs = []
    state = 0

    for line in fin:
        # change tabs to spaces
        while line.find("\t") >= 0:
            i = line.find("\t")
            line = line[:i] + " "*(tab_width - i%tab_width) + line[i + 1:]
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
                cut_off = 0
                state = 1
        elif state == 1: # inside
            # cut idx_begin chars off at the beginning of line
            cmd = line[idx_begin:]
            if cmd == doc_end:
                for line in docs:
                    fout.write(line)
                docs = []
                state = 0
                continue
            elif cmd.find(cmd_tab_width) == 0:
                try:
                    param = int(cmd[len(cmd_tab_width):-1])
                    if (param <= 0) or (param > 16):
                        raise Exception()
                    tab_width = param
                except:
                    sys.stderr.write("Invalid command: " + cmd)
                continue
            elif cmd.find(cmd_cut_off) == 0:
                try:
                    param = int(cmd[len(cmd_cut_off):-1])
                    if (param < -16) or (param > 16):
                        raise Exception()
                    cut_off = param
                except:
                    sys.stderr.write("Invalid command: " + cmd)
                continue

            # cut (idx_begin + cut_off) chars off at the beginning of line
            if idx_begin + cut_off < 0:
                line = " "*( -(idx_begin + cut_off) ) + line
            elif len(line) <= idx_begin + cut_off:
                line = "\n"
            else:
                line = line[idx_begin + cut_off:]
            docs += line
