#!/usr/bin/env python3
"""Link checker for the Telvergence / Restoration Royalties site.

Verifies every internal href resolves to a real file and reports external
links so none of them go stale. Run before any deploy:

    python3 tools/linkcheck.py          # internal only (fast, offline)
    python3 tools/linkcheck.py --net    # also check external URLs over HTTP

Exit code is non-zero when a broken internal link is found, so this can gate
a deploy.
"""
import os
import re
import sys
import argparse
from urllib.parse import urlsplit, unquote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {'.git', 'node_modules', 'tools'}
SKIP_SCHEMES = ('mailto:', 'tel:', 'sms:', 'javascript:', 'data:', 'geo:', 'fax:')

# hrefs built inside JavaScript template strings are not static links
DYNAMIC = re.compile(r"""[\$'"`]|\+\s|\{\{|\}\}""")

HREF = re.compile(r'(?:href|src)\s*=\s*"([^"]*)"', re.I)


def page_files():
    for base, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for f in files:
            if f.endswith(('.html', '.htm')):
                yield os.path.join(base, f)


def exists(target_abs):
    if os.path.isfile(target_abs):
        return True
    if os.path.isdir(target_abs) and os.path.isfile(os.path.join(target_abs, 'index.html')):
        return True
    # extensionless paths served as .html
    return os.path.isfile(target_abs + '.html')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--net', action='store_true', help='also verify external URLs')
    args = ap.parse_args()

    broken, external, dynamic_skipped = [], {}, 0

    for path in page_files():
        rel = os.path.relpath(path, ROOT)
        try:
            src = open(path, encoding='utf-8', errors='ignore').read()
        except OSError:
            continue

        for raw in HREF.findall(src):
            href = raw.strip()
            if not href or href.startswith('#'):
                continue
            low = href.lower()
            if low.startswith(SKIP_SCHEMES):
                continue
            if low.startswith(('http://', 'https://', '//')):
                external.setdefault(href.split('#')[0], []).append(rel)
                continue
            if DYNAMIC.search(href):
                dynamic_skipped += 1
                continue

            target = unquote(urlsplit(href).path)
            if not target:
                continue
            if target.startswith('/'):
                cand = os.path.join(ROOT, target.lstrip('/'))
            else:
                cand = os.path.normpath(os.path.join(os.path.dirname(path), target))
            if not exists(cand):
                broken.append((rel, href))

    print('== internal links ==')
    if broken:
        for rel, href in sorted(broken):
            print('  BROKEN  %s  ->  %s' % (rel, href))
    print('  broken: %d   (skipped %d script-generated hrefs)' % (len(broken), dynamic_skipped))

    print('\n== external links (%d unique) ==' % len(external))
    if args.net:
        import urllib.request
        import ssl
        ctx = ssl.create_default_context()
        bad_ext = 0
        for url in sorted(external):
            try:
                req = urllib.request.Request(url, method='HEAD',
                                             headers={'User-Agent': 'linkcheck/1.0'})
                with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
                    code = r.status
            except Exception as e:
                code = getattr(e, 'code', 0) or 0
            flag = 'OK  ' if 200 <= code < 400 else 'DEAD'
            if flag == 'DEAD':
                bad_ext += 1
                print('  %s %-3s %s' % (flag, code or '---', url))
                for p in external[url][:3]:
                    print('        on %s' % p)
        print('  unreachable: %d' % bad_ext)
    else:
        for url in sorted(external):
            print('  %-64s (%d page%s)' % (url[:64], len(external[url]),
                                           '' if len(external[url]) == 1 else 's'))
        print('  (pass --net to verify these over HTTP)')

    return 1 if broken else 0


if __name__ == '__main__':
    sys.exit(main())
