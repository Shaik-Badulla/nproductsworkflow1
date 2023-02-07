import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';
// eslint-disable-next-line import/no-cycle
import { dispatch } from '../store';
import { IUser, IUserState } from '../../@types/user';
import { StatusCodes } from '../../utils/status-codes';
import { extractErrorMessage } from '../../utils/errorHelper';

const initialState: IUserState = {
  loadingStatus: StatusCodes.NONE,
  createStatus: StatusCodes.NONE,
  updateStatus: StatusCodes.NONE,
  statusChangeStatus: StatusCodes.NONE,
  deleteStatus: StatusCodes.NONE,
  error: false,
  errorMessage: null,
  users: [],
  user: null,
  sortBy: null,
  filters: {
    url: '',
  },
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.loadingStatus = StatusCodes.REQUESTED;
    },
    startCreating(state) {
      state.createStatus = StatusCodes.REQUESTED;
    },
    startUpdating(state) {
      state.updateStatus = StatusCodes.REQUESTED;
    },
    startStatusChanging(state) {
      state.statusChangeStatus = StatusCodes.REQUESTED;
    },

    startDeleting(state) {
      state.deleteStatus = StatusCodes.REQUESTED;
    },

    hasError(state, action) {
      state.error = action.payload;
      state.errorMessage = extractErrorMessage(action.payload);
    },

    getUsersSuccess(state, action) {
      state.loadingStatus = StatusCodes.COMPLETED;
      state.users = action.payload;
    },

    getUserSuccess(state, action) {
      state.loadingStatus = StatusCodes.COMPLETED;
      state.user = action.payload;
    },

    addUserSuccess(state, action) {
      state.createStatus = StatusCodes.COMPLETED;
      state.users.push(action.payload);
    },

    updateUserSuccess(state, action) {
      state.updateStatus = StatusCodes.COMPLETED;
      const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
      state.users[userIndex] = action.payload;
    },

    statusChangeSuccess(state, action) {
      state.statusChangeStatus = StatusCodes.COMPLETED;
      const { ids, disable } = action.payload;
      const disabledUsers = state.users.filter((user) => ids.includes(user.id));
      // eslint-disable-next-line no-return-assign
      // disabledUsers.forEach((user) => (user.disabled = disable));
    },

    deleteUserSuccess(state, action) {
      state.deleteStatus = StatusCodes.COMPLETED;
      const idx = state.users.findIndex((user: IUser) => user.id === action.payload);
      if (idx > -1) {
        state.users.splice(idx, 1);
      }
    },

    resetStatus(state) {
      state.updateStatus = StatusCodes.NONE;
      state.createStatus = StatusCodes.NONE;
      state.statusChangeStatus = StatusCodes.NONE;
      state.error = false;
      state.errorMessage = null;
    },
    resetError(state) {
      state.error = false;
      state.errorMessage = null;
    },
  },
});

// Reducer
export default slice.reducer;

export function getUsers(selectedOrg?: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      let orgQuery = '';
      if (selectedOrg && selectedOrg !== '-1') {
        orgQuery = `?orgId=${selectedOrg}`;
      }
      const response = await axios.get(`/user/${orgQuery}`);

      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addUser(user: IUser) {
  return async () => {
    dispatch(slice.actions.startCreating());
    try {
      const response = await axios.post('/user/', user);

      dispatch(slice.actions.addUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateUser(user: IUser) {
  return async () => {
    dispatch(slice.actions.startUpdating());
    try {
      const response = await axios.put(`/user/${+user.id}`, user);
      dispatch(slice.actions.updateUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateUserStatus(users: Array<IUser>, disable: boolean) {
  return async () => {
    dispatch(slice.actions.startStatusChanging());
    const ids = users.map((user) => user.id);
    try {
      if (disable) {
        const response = await axios.put(`/user/disable`, ids);
      } else {
        const response = await axios.put(`/user/enable`, ids);
      }

      dispatch(slice.actions.statusChangeSuccess({ ids, disable }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteUser(id: string) {
  return async () => {
    dispatch(slice.actions.startDeleting());
    try {
      const response = await axios.delete(`/crm/${id}`);
      dispatch(slice.actions.deleteUserSuccess(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function resetStatus() {
  return async () => {
    dispatch(slice.actions.resetStatus());
  };
}

export function resetError() {
  return async () => {
    dispatch(slice.actions.resetError());
  };
}
