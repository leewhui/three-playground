import { createSlice } from '@reduxjs/toolkit'
import { setFromSerializedState } from '../../hooks/useLoadFromHash';
import { StateInterface } from '../../type'
import { changeCodeAction, changeCurrentFileAction, changeStateAction } from './reducer'

const hash = location.hash.substr(1);
const state = setFromSerializedState(hash);

const initialState: StateInterface = state

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    changeCode: changeCodeAction,
    changeCurrentFile: changeCurrentFileAction,
    changeState: changeStateAction
  },
})

export const { changeCode, changeCurrentFile, changeState } = projectSlice.actions
export default projectSlice.reducer
