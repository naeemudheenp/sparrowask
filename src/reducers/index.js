import {combineReducers } from 'redux';
import customAlert from './CustomAlert';
import selectedtId from './SelectedId';
import setAnswer from './SetAnswer';
const reducers =  combineReducers({customAlert,selectedtId,setAnswer})
export default reducers; 




