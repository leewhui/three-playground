import { Notification } from '@mantine/core';
import { useDebounceFn } from 'ahooks';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { StateInterface } from '../../type';
import { getImportedMap } from '../../util';
import { PreviewProxy } from './previewProxy';
import srcdoc from './srcdoc.html?raw';
import styles from './preview.module.less';

const sandboxAttributes = [
	'allow-forms',
	'allow-modals',
	'allow-pointer-lock',
	'allow-popups',
	'allow-same-origin',
	'allow-scripts',
	'allow-top-navigation-by-user-activation'
].join(' ');

interface PreviewInterface {
	state: StateInterface;
}

export const Preview: FC<PreviewInterface> = (props) => {
	const { state } = props;
	const sandboxRef = useRef<HTMLIFrameElement>(null);
	const previewProxy = useRef<PreviewProxy>();
	const [ error, setErrorMessage ] = useState<string | null>(null);

	const { run } = useDebounceFn(
		() => {
			if (!previewProxy || !previewProxy.current) return;
			setErrorMessage(null);
			previewProxy.current.eval(state.files[state.mainFile].code);
		},
		{ wait: 250 }
	);

	const srcDoc = useMemo(
		() => {
			const importedMap = getImportedMap(state.files);
			return srcdoc.replace(/<!--IMPORT_MAP-->/, JSON.stringify({ imports: importedMap }));
		},
		[ state.files['import-map.json'] ]
	);

	useEffect(
		() => {
			if (!sandboxRef || !sandboxRef.current) return;
			previewProxy.current = new PreviewProxy(sandboxRef.current, {
				on_error: (err: any) => {
					const userAgent = navigator.userAgent.toUpperCase();
					if (userAgent.indexOf('FIREFOX') > -1) {
						setErrorMessage(
							`${err.value.message}, at (${err.value.lineNumber}, ${err.value.columnNumber})`
						);
					} else {
						setErrorMessage(err.value.message);
					}
				},
				on_console: () => {}
			});
		},
		[ sandboxRef ]
	);

	useEffect(run, [ state.files[state.mainFile] ]);

	return (
		<div className={styles['preview-container']}>
			<iframe srcDoc={srcDoc} sandbox={sandboxAttributes} ref={sandboxRef} className={styles['preview-iframe']} />

			{error && (
				<Notification
					title="Error"
					color="red"
					onClose={() => setErrorMessage(null)}
					className={styles['preview-notification']}
				>
					{error}
				</Notification>
			)}
		</div>
	);
};
