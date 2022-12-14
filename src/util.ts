import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate"
import default_three from './constants/default_three.js?raw';
import { createFileState, FileInterface } from "./type"

// 解压缩
export function atou(base64: string): string {
  const binary = atob(base64)
  if (binary.startsWith('\x78\xDA')) {
    const buffer = strToU8(binary, true)
    const unzipped = unzlibSync(buffer)
    return strFromU8(unzipped)
  }
  return decodeURIComponent(escape(binary))
}

// 压缩
export const utoa = (data: string): string => {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}

export const getImportedMap = (files: Record<string, FileInterface>) => {
  const importedmMap = files['import-map.json']
  if (!importedmMap) return {};
  return JSON.parse(importedmMap.code);
}

export const getLanguage = (filename: string) => {
  if (filename.endsWith('.js')) return 'javascript';
  if (filename.endsWith('.html')) return 'html';
  return '';
}

export const setFromSerializedState = (serializedState: string) => {
  const files = initState(serializedState);
  return {
    mainFile: 'index.js',
    files,
    currentFile: 'index.js',
    error: [],
  }
}

const initState = (serializedState: string) => {
  const files: Record<string, FileInterface> = {};
  if (serializedState) {
    const saved = JSON.parse(atou(serializedState))
    for (const filename in saved) {
      files[filename] = createFileState(filename, saved[filename]);
    }
  }

  if (!files['index.js']) {
    const file = createFileState('index.js', default_three.trim());
    files['index.js'] = file;
  }

  if (!files['import-map.json']) {
    files['import-map.json'] = createFileState('import-map.json', JSON.stringify({
      'three': "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.146.0/three.module.min.js"
    }))
  }
  return files;
}

export const setHash = (files: Record<string, FileInterface>) => {
  const exported: Record<string, string> = {};
  for (const filename in files) {
    exported[filename] = files[filename].code
  }
  const hash = '#' + utoa(JSON.stringify(exported))
  location.hash = hash;
}
