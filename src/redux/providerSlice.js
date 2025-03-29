import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Remove if not used
import axios from 'axios';
import {Alert} from 'react-native'; // Import alert for error handling
import {API_URL} from '../../config';

// const API_URL = 'http://192.168.0.102:5000';
// const API_URL = 'http://192.168.42.109:5000'; //phone

// Initial state for the provider
const initialState = {
  data: [],
  user: null,
  loading: false,
  error: null,
};

export const testApi = createAsyncThunk('testApi', async () => {
  try {
    const response = await axios.get(`${API_URL}/test`);
    const data = response.data;
    console.log('click');
    if (!data) throw new Error('No data received');
    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error(error.message || 'Request failed'); // Ensure error is thrown
  }
});

// API for uploadVoterDetails
export const loginuser = createAsyncThunk(
  'login',
  async ({email, password}) => {
    console.log(email);

    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });

      const userData = response.data;
      console.log(userData);

      if (userData.status === 'success') {
        await AsyncStorage.setItem('Authtoken', userData.token);
        await AsyncStorage.setItem('userRole', userData.user.role);
        await AsyncStorage.setItem('userName', userData.user.name);
        await AsyncStorage.setItem('AssemblyNO', userData.user.constituencyNo);
        await AsyncStorage.setItem(
          'AssemblyName',
          userData.user.constituencyName,
        );
      } else {
      }

      return userData; // Return response data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },
);

// API for uploadVoterDetails

export const uploadVoterDetails = createAsyncThunk(
  'uploadVoterDetails',
  async formDataWithImage => {
    console.log(formDataWithImage);

    try {
      const response = await axios.post(
        `${API_URL}/api/uploadVoterDetails`,
        formDataWithImage,
      );
      Alert.alert('Success', 'Form submitted successfully');
      return response.data;
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to submit form');
      throw new Error(error.message || 'Form submission failed');
    }
  },
);

// API for getting registered candidates by Constituency
export const getRegisteredConstituencyWithCandidatesName = createAsyncThunk(
  'getRegisteredConstituencyWithCandidatesName',
  async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/getRegisteredConstituencyWithCandidatesName`,
      );
      const data = response.data;
      console.log(data, 'getRegisteredConstituencyWithCandidatesName');
      if (!data) throw new Error('No data received');
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error(error.message || 'Request failed'); // Ensure error is thrown
    }
  },
);

// API for getting registered candidates by Constituency
export const getRegisteredCandidatesNamebyConstituency = createAsyncThunk(
  'getRegisteredCandidatesNamebyConstituency',
  async ConstituencyNO => {
    console.log(ConstituencyNO, 'ConstituencyNO');
    try {
      const response = await axios.get(
        `${API_URL}/api/getRegisteredCandidatesNamebyConstituency/${ConstituencyNO}`,
      );
      const data = response.data;
      console.log(data, 'getRegisteredCandidatesNamebyConstituency');
      if (!data) throw new Error('No data received');
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error(error.message || 'Request failed'); // Ensure error is thrown
    }
  },
);

export const getVotersDetailsByAssembly = createAsyncThunk(
  'getVotersDetailsByAssembly',
  async ConstituencyNO => {
    console.log(ConstituencyNO, 'ConstituencyNO');
    try {
      const response = await axios.get(
        `${API_URL}/api/getVotersDetailsByAssembly/${ConstituencyNO}`,
      );
      const data = response.data;
      console.log(data, 'getVotersDetailsByAssembly');
      if (!data) throw new Error('No data received');
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error(error.message || 'Request failed');
    }
  },
);

const providerSlice = createSlice({
  name: 'Provider',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(testApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(testApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(testApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'An unknown error occurred';
      })
      .addCase(loginuser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store the user data
      })
      .addCase(loginuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Login failed';
      })
      .addCase(uploadVoterDetails.pending, state => {
        state.loading = true; // Show loading state
        state.error = null; // Clear any previous errors
      })
      .addCase(uploadVoterDetails.fulfilled, (state, action) => {
        state.loading = false; // Hide loading state
        // Optionally update state with data (e.g., submission success, new voter data)
        // state.data = action.payload;
        console.log('Upload Success:', action.payload);
      })
      .addCase(uploadVoterDetails.rejected, (state, action) => {
        state.loading = false; // Hide loading state
        state.error = action.error?.message || 'Upload failed'; // Handle error
      })
      .addCase(getRegisteredConstituencyWithCandidatesName.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getRegisteredConstituencyWithCandidatesName.fulfilled,
        (state, action) => {
          state.loading = false;
        },
      )
      .addCase(
        getRegisteredConstituencyWithCandidatesName.rejected,
        (state, action) => {
          state.loading = false; // Hide loading state
          state.error =
            action.error?.message ||
            'Getting error in getRegisteredConstituencyWithCandidatesName';
        },
      )
      .addCase(getRegisteredCandidatesNamebyConstituency.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getRegisteredCandidatesNamebyConstituency.fulfilled,
        (state, action) => {
          state.loading = false;
        },
      )
      .addCase(
        getRegisteredCandidatesNamebyConstituency.rejected,
        (state, action) => {
          state.loading = false; // Hide loading state
          state.error =
            action.error?.message ||
            'Getting error in getRegisteredCandidatesNamebyConstituency';
        },
      )
      .addCase(getVotersDetailsByAssembly.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVotersDetailsByAssembly.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getVotersDetailsByAssembly.rejected, (state, action) => {
        state.loading = false; // Hide loading state
        state.error =
          action.error?.message ||
          'Getting error in getVotersDetailsByAssembly';
      });
  },
});

export const {logout} = providerSlice.actions;
export const providerReducer = providerSlice.reducer;
