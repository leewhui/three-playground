import { FC } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';

interface CodeEditorInterface {
	value: string;
	lang: string;
	onChange: (value: string) => void;
}

export const CodeEditor: FC<CodeEditorInterface> = (props) => {
	const { value, lang } = props;

	const beforeMountEditor = (monaco: Monaco) => {
    monaco.languages.typescript.typescriptDefaults.addExtraLib("declare module 'three'");
		import('monaco-themes/themes/Dracula.json').then((data: any) => {
			monaco.editor.defineTheme('Dracula', data);
			monaco.editor.setTheme('Dracula');
		});
	};

	return (
		<Editor
			theme="vs-dark"
			language={lang}
			value={value}
			beforeMount={beforeMountEditor}
			onChange={(value) => props.onChange(value || '')}
		/>
	);
};
