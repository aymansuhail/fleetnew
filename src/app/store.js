import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import headerSlice from '../features/common/headerSlice';
import modalSlice from '../features/common/modalSlice';
import rightDrawerSlice from '../features/common/rightDrawerSlice';
import leadsSlice from '../features/leads/leadSlice';

const combinedReducer = combineReducers({
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  leads: leadsSlice,
});

const store = configureStore({
  reducer: combinedReducer,
});

export default store;
