"""Behavior checks for shipped skill tooling; no application files are modified."""
import importlib.util
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / '.agents/skills/xizot-design-system/scripts/ui-source.py'
spec = importlib.util.spec_from_file_location('ui_source', SCRIPT)
tool = importlib.util.module_from_spec(spec)
spec.loader.exec_module(tool)


class SkillToolingTests(unittest.TestCase):
    def test_source_and_installed_discovery(self):
        for prefix in ('', 'design-system', 'node_modules/ui-design-system'):
            with tempfile.TemporaryDirectory() as directory:
                root = Path(directory).resolve()
                source = root / prefix
                (source / 'components/ui').mkdir(parents=True)
                (source / 'components/rhf').mkdir()
                (source / 'components/rhf/rhf-input.tsx').write_text('export function RHFInput() {}', encoding='utf-8')
                result = tool.discover(root, 'rhf')
                self.assertEqual(len(result['files']), 1)
                self.assertEqual(Path(result['source_root']), source)

    def test_mixed_installations_require_selection_and_honor_marker(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory).resolve()
            for prefix in ('design-system', 'node_modules/ui-design-system'):
                (root / prefix / 'components/ui').mkdir(parents=True)
                (root / prefix / 'components/rhf').mkdir()
                (root / prefix / 'components/ui/button.tsx').write_text('export const Button = 1;')
            with self.assertRaises(ValueError):
                tool.discover(root, 'button')
            for mode, prefix in [('source', 'design-system'), ('package', 'node_modules/ui-design-system')]:
                self.assertEqual(Path(tool.discover(root, 'button', mode)['source_root']), root / prefix)
                (root / 'AGENTS.md').write_text('<!-- BEGIN:design-system-usage-rules -->\n# Design system ' + mode + ' mode\n<!-- END:design-system-usage-rules -->')
                self.assertEqual(Path(tool.discover(root, 'button')['source_root']), root / prefix)
            self.assertEqual(Path(tool.discover(root, 'button', 'source')['source_root']), root / 'design-system')

    def test_selected_missing_mode_does_not_fall_back(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory).resolve()
            (root / 'design-system/components/ui').mkdir(parents=True)
            (root / 'design-system/components/rhf').mkdir()
            with self.assertRaises(ValueError):
                tool.discover(root, '', 'package')

    def test_missing_root_and_invalid_review_paths_fail(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory).resolve()
            with self.assertRaises(ValueError):
                tool.discover(root, 'input')
            for path in ('missing.tsx', '../outside.tsx'):
                with self.assertRaises(ValueError):
                    tool.review(root, [path])

    def test_form_review_and_valid_composition(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory).resolve()
            file = root / 'form.tsx'
            file.write_text('const data: any = {};\nconst ui = <form><input /></form>;', encoding='utf-8')
            result = tool.review(root, ['form.tsx'])
            self.assertEqual({f['rule'] for f in result['findings']}, {'unsafe-type', 'form-owner', 'native-control'})
            file.write_text('const ui = <form onSubmit={handleSubmit(save)}><RHFInput /></form>;', encoding='utf-8')
            result = tool.review(root, ['form.tsx'])
            self.assertEqual(result['findings'], [])
            self.assertEqual(result['semantic_review'], 'not_performed')

    def test_cli_invalid_input_has_nonzero_status(self):
        result = subprocess.run([sys.executable, str(SCRIPT), '--root', str(ROOT), 'review', 'missing.tsx'], capture_output=True, text=True)
        self.assertEqual(result.returncode, 2)


if __name__ == '__main__':
    unittest.main()
