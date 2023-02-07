import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';
import { extractErrorMessage } from 'src/utils/errorHelper';
import { StatusCodes } from 'src/utils/status-codes';

// eslint-disable-next-line import/extensions
import { Demo, DemoRequest, DemoState } from '../../@types/demo';

const initialState: DemoState = {
  loadingStatus: StatusCodes.NONE,
  createStatus: StatusCodes.NONE,
  updateStatus: StatusCodes.NONE,
  statusChangeStatus: StatusCodes.NONE,
  deleteStatus: StatusCodes.NONE,
  error: false,
  errorMessage: null,
  demos: [],
  demo: null,
  sortBy: null,
  filters: {
    email: '',
  },
  selectedDemosName: '',
};

const slice = createSlice({
  name: 'demo',
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

    getDemosSuccess(state, action) {
      state.loadingStatus = StatusCodes.COMPLETED;
      state.demos = action.payload;
    },

    getDemoSuccess(state, action) {
      state.loadingStatus = StatusCodes.COMPLETED;
      state.demo = action.payload;
    },

    addDemoSuccess(state, action) {
      state.createStatus = StatusCodes.COMPLETED;
      state.demos.push(action.payload);
    },

    updateDemoSuccess(state, action) {
      state.updateStatus = StatusCodes.COMPLETED;
      const demoIndex = state.demos.findIndex((demo: Demo) => demo.id === action.payload.id);
      state.demos[demoIndex] = action.payload;
    },

    deleteDemoSuccess(state, action) {
      state.deleteStatus = StatusCodes.COMPLETED;
      const idx = state.demos.findIndex((demo: Demo) => demo.id === action.payload);
      if (idx > -1) {
        state.demos.splice(idx, 1);
      }
    },

    resetTask(state) {
      state.updateStatus = StatusCodes.NONE;
      state.createStatus = StatusCodes.NONE;
      state.deleteStatus = StatusCodes.NONE;
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

export function getDemo() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/demo/');
      dispatch(slice.actions.getDemosSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addDemo(demo: DemoRequest) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startCreating());
    try {
      const response = await axios.post('/v1/demo/', demo);
      dispatch(slice.actions.addDemoSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateDemo(demo: DemoRequest) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startUpdating());
    try {
      const response = await axios.put(`/v1/demo/${demo.id}`, demo);
      dispatch(slice.actions.updateDemoSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteDemo(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startCreating());
    try {
      const response = await axios.delete(`/demo/${id}`);
      dispatch(slice.actions.deleteDemoSuccess(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function resetTask() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.resetTask());
  };
}

export function resetError() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.resetError());
  };
}
