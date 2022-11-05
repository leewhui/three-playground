import { RootState } from "../store";

export const getFiles = (state: RootState) => {
  return state.project.files;
}

export const getCurrentCode = (state: RootState) => {
  const filename = state.project.currentFile;
  return state.project.files[filename].code;
}

export const getCurrentFile = (state: RootState) => {
  const filename = state.project.currentFile;
  return state.project.files[filename];
}

export const getState = (state: RootState) => {
  return state.project;
}
