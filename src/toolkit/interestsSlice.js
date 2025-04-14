// frontend/src/features/interests/interestsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchUsers = createAsyncThunk(
  'interests/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendInterest = createAsyncThunk(
  'interests/sendInterest',
  async (interestData, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${API_URL}/interests/`, interestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchReceivedInterests = createAsyncThunk(
  'interests/fetchReceivedInterests',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/interests/received/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInterestStatus = createAsyncThunk(
  'interests/updateInterestStatus',
  async ({ interestId, status }, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.patch(
        `${API_URL}/interests/${interestId}/`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const interestsSlice = createSlice({
  name: 'interests',
  initialState: {
    users: [],
    receivedInterests: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(sendInterest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendInterest.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendInterest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchReceivedInterests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReceivedInterests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.receivedInterests = action.payload;
      })
      .addCase(fetchReceivedInterests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateInterestStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateInterestStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.receivedInterests.findIndex(
          (interest) => interest.id === action.payload.id
        );
        if (index !== -1) {
          state.receivedInterests[index] = action.payload;
        }
      })
      .addCase(updateInterestStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default interestsSlice.reducer;