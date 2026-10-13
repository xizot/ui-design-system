#!/usr/bin/env python3
"""Read-only source discovery and heuristic review; Python standard library only."""
import argparse
import json
from pathlib import Path
import re


def profile(name):
    """Return an explicit website profile; never silently classify a product."""
    file = Path(__file__).resolve().parents[1] / 'data/website-profiles.json'
    profiles = json.loads(file.read_text(encoding='utf-8'))
    if name not in profiles:
        raise ValueError('Unknown profile. Choose: ' + ', '.join(profiles))
    return {'profile': name, **profiles[name], 'authority': 'Design starting point; user requirements and verified local contracts take precedence.'}


def design_reference(kind, name=None):
    """Retrieve one explicit design choice; never infer branding or product behavior."""
    filenames = {'pattern': 'page-patterns.json', 'recipe': 'visual-recipes.json'}
    if kind not in filenames:
        raise ValueError('Unknown design reference kind: ' + kind)
    file = Path(__file__).resolve().parents[2] / 'xizot-page-builder/data' / filenames[kind]
    entries = json.loads(file.read_text(encoding='utf-8'))
    if name is None:
        return {'kind': kind, 'choices': [
            {'id': key, 'intent': value['intent']} for key, value in entries.items()
        ]}
    if name not in entries:
        raise ValueError('Unknown ' + kind + '. Choose: ' + ', '.join(entries))
    return {kind: name, **entries[name],
            'authority': 'Design default, not a required scaffold. Preserve existing product decisions unless redesign is requested. Source contracts govern component APIs; inspect before composing.',
            'verification': 'Guidance only; this lookup does not validate a palette, font, rendered layout or agent output.'}


def locate(root, mode=None):
    if mode is None and (root / 'AGENTS.md').is_file():
        content = (root / 'AGENTS.md').read_text(encoding='utf-8')
        section = re.search(r'<!-- BEGIN:design-system-usage-rules -->(.*?)<!-- END:design-system-usage-rules -->', content, re.S)
        if section:
            selected = re.search(r'^# Design system (source|package) mode$', section[1], re.M)
            if selected:
                mode = selected[1]
    sources = [root / 'design-system', root / 'src/design-system', root]
    package = root / 'node_modules/ui-design-system'
    valid = lambda p: (p / 'components/ui').is_dir() and (p / 'components/rhf').is_dir()
    source = next((p for p in sources if valid(p)), None)
    if mode:
        candidate = package if mode == 'package' else source
        if candidate is not None and valid(candidate):
            return candidate
        raise ValueError('Selected ' + mode + ' installation is missing.')
    if source is not None and valid(package):
        raise ValueError('Both installations exist; pass --mode source or --mode package.')
    if source is not None:
        return source
    if valid(package):
        return package
    raise ValueError('No design-system source found; pass the application root with --root.')


def discover(root, query, mode=None):
    source = locate(root, mode)
    terms = query.lower().split()
    matches = []
    for folder in ('components/ui', 'components/rhf', 'hooks', 'lib', 'constants'):
        for file in sorted((source / folder).rglob('*')):
            if file.suffix not in ('.ts', '.tsx', '.js', '.jsx'):
                continue
            body = file.read_text(encoding='utf-8')
            if not terms or any(term in (file.stem + '\n' + body).lower() for term in terms):
                matches.append(str(file.relative_to(root)))
    return {'source_root': str(source), 'files': matches, 'next': 'Read matched source and callers before using props.'}


def review(root, paths):
    findings = []
    checked = []
    for name in paths:
        file = (root / name).resolve()
        if not file.is_relative_to(root):
            raise ValueError('Review paths must stay inside --root: ' + name)
        if not file.is_file() or file.suffix not in ('.tsx', '.ts', '.jsx', '.js'):
            raise ValueError('Expected an existing JS/TS source file: ' + name)
        body = file.read_text(encoding='utf-8')
        checked.append(name)
        rules = [
            ('native-control', r'<(?:input|select|textarea)\b', 'Check whether an existing Xizot/RHF wrapper owns this control; primitives may legitimately use native elements.'),
            ('raw-overlay-content', r'<(?:Popover|Dialog|Sheet)Content\b', 'Application overlays should use the matching *Panel and its size. Check whether this is a reusable control with a different structure.'),
            ('unsafe-type', r'\bas\s+any\b|:\s*any\b|\bas\s+unknown\s+as\b', 'Use the actual contract; explain any unavoidable boundary cast.'),
            ('suppression', r'eslint-disable|@ts-ignore|@ts-nocheck', 'Resolve the underlying issue or document a narrow justified exception.'),
        ]
        if re.search(r'<form\b', body) and not re.search(r'handleSubmit|FormProvider|useFormContext', body):
            findings.append({'file': name, 'line': 1, 'rule': 'form-owner', 'message': 'Locate RHF submit ownership across files; classify search/native-form exceptions explicitly.'})
        for rule, pattern, message in rules:
            for match in re.finditer(pattern, body):
                findings.append({'file': name, 'line': body.count('\n', 0, match.start()) + 1, 'rule': rule, 'message': message})
    return {'checked': checked, 'findings': findings, 'semantic_review': 'not_performed',
            'limitations': 'Text heuristics can match comments and miss aliases, composed forms and cross-file behavior. Review each finding; also run lint, types and behavior checks.'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path.cwd())
    parser.add_argument('--mode', choices=('source', 'package'))
    sub = parser.add_subparsers(dest='command', required=True)
    lookup = sub.add_parser('discover')
    lookup.add_argument('query', nargs='?', default='')
    check = sub.add_parser('review')
    check.add_argument('paths', nargs='+')
    design = sub.add_parser('profile')
    design.add_argument('name')
    for name in ('pattern', 'recipe'):
        reference = sub.add_parser(name, help='List choices or retrieve one design reference')
        reference.add_argument('name', nargs='?')
    args = parser.parse_args()
    root = args.root.resolve()
    try:
        if args.command == 'profile':
            result = profile(args.name)
        elif args.command in ('pattern', 'recipe'):
            result = design_reference(args.command, args.name)
        elif args.command == 'discover':
            result = discover(root, args.query, args.mode)
        else:
            result = review(root, args.paths)
    except (ValueError, OSError) as error:
        parser.exit(2, str(error) + '\n')
    print(json.dumps(result, ensure_ascii=True, indent=2))


if __name__ == '__main__':
    main()
