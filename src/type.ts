export interface FileInterface {
  filename: string;
  code: string;
  compiled: string;
}

export interface StateInterface {
  mainFile: string;
  files: Record<string, FileInterface>;
  currentFile: string;
  error: string[];
}

export const createFileState = (filename: string, code: string) => {
  return {
    filename,
    code,
    compiled: ''
  }
}
