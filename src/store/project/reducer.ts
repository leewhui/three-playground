import { PayloadAction } from "@reduxjs/toolkit";
import { StateInterface } from "../../type";

export const changeCodeAction = (state: StateInterface, action: PayloadAction<string>) => {
  state.files[state.currentFile].code = action.payload;
}

export const changeCurrentFileAction = (state: StateInterface, action: PayloadAction<string>) => {
  const filename = action.payload;
  if (!state.files[filename]) return;
  state.currentFile = filename;
}

export const changeStateAction = (state: StateInterface, action: PayloadAction<StateInterface>) => {
  const nextState = action.payload;
  state.currentFile = nextState.currentFile
  state.error = nextState.error;
  state.files = nextState.files;
  state.mainFile = nextState.mainFile;
}
