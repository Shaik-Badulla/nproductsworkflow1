import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
// eslint-disable-next-line import/no-cycle
import userReducer from './slices/user';
// eslint-disable-next-line import/no-cycle
import roleReducer from './slices/role';
import crmReducer from './slices/crm';
import demoReducer from './slices/demo';
// eslint-disable-next-line import/no-cycle
import hrprojectReducer from './slices/hrproject';
// eslint-disable-next-line import/no-cycle
import hrtaskReducer from './slices/hrtask';
// eslint-disable-next-line import/no-cycle
import hrsubtaskReducer from './slices/hrsubtask';
// eslint-disable-next-line import/no-cycle
import hrtimesheetattendanceReducer from './slices/hrtimesheetattendance';

import productReducer from './slices/product';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy'],
};

const rolePersistConfig = {
  key: 'role',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy'],
};

const hrProjectPersistConfig = {
  key: 'hrproject',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy'],
};
const hrTaskPersistConfig = {
  key: 'hrtask',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy'],
};
const hrSubtaskPersistConfig = {
  key: 'hrsubtask',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy'],
};
const hrTimesheetAttendancePersistConfig = {
  key: 'hrtimesheetattendance',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy'],
};

const rootReducer = combineReducers({
  crm: crmReducer,
  demo: demoReducer,
  user: persistReducer(userPersistConfig, userReducer),
  role: persistReducer(rolePersistConfig, roleReducer),
  hrproject: persistReducer(hrProjectPersistConfig, hrprojectReducer),
  hrtask: persistReducer(hrTaskPersistConfig, hrtaskReducer),
  hrsubtask: persistReducer(hrSubtaskPersistConfig, hrsubtaskReducer),
  hrtimesheetattendance: persistReducer(
    hrTimesheetAttendancePersistConfig,
    hrtimesheetattendanceReducer
  ),

  product: persistReducer(productPersistConfig, productReducer),
});

export default rootReducer;
