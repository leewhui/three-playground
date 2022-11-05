import { CodeEditor } from './views/editor/editor';
import { Preview } from './views/preview/preview';
import { useSelector } from 'react-redux';
import { getCurrentFile, getState } from './store/project/selector';
import { useDispatch } from 'react-redux';
import { changeCode, changeCurrentFile } from './store/project/project';
import { Tabs } from '@mantine/core';
import { getLanguage } from './util';

function App() {
	const state = useSelector(getState);
	const currentFile = useSelector(getCurrentFile);
	const dispatch = useDispatch();

	const onChangeCode = (code: string) => {
		dispatch(changeCode(code));
	};

	const onChangeCurrentFile = (filename: string) => {
		dispatch(changeCurrentFile(filename));
	};

	return (
		<div style={{ width: '100%', height: '100vh', display: 'flex', overflow: 'hidden' }}>
			<div style={{ width: '50%' }}>
				<Tabs value={state.currentFile} onTabChange={onChangeCurrentFile}>
					<Tabs.List>
						<Tabs.Tab value={state.files['index.ts'].filename}>index.ts</Tabs.Tab>
					</Tabs.List>
				</Tabs>
				<CodeEditor value={currentFile.code} onChange={onChangeCode} lang={getLanguage(currentFile.filename)} />
			</div>
			<Preview state={state} />
		</div>
	);
}

export default App;
