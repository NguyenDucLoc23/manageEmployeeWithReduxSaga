import {
  GET_PROVINCES,
  GET_PROVINCES_SUCCESS,
  GET_PROVINCES_FAILURE,
  SEARCH_PROVINCES,
  SEARCH_PROVINCES_SUCCESS,
  SEARCH_PROVINCES_FAILURE,
  ADD_PROVINCE,
  ADD_PROVINCE_SUCCESS,
  ADD_PROVINCE_FAILURE,
  DELETE_PROVINCE,
  DELETE_PROVINCE_SUCCESS,
  DELETE_PROVINCE_FAILURE,
  UPDATE_PROVINCE,
  UPDATE_PROVINCE_SUCCESS,
  UPDATE_PROVINCE_FAILURE,
} from "../constant/ProvinceConstant";

export const getProvinces = () => {
  return {
    type: GET_PROVINCES,
  };
};

export const getProvincesSuccess = (provinces) => {
  return {
    type: GET_PROVINCES_SUCCESS,
    payload: provinces,
  };
};

export const getProvincesFailure = (error) => {
  return {
    type: GET_PROVINCES_FAILURE,
    payload: error,
  };
};

export const searchProvinces = (searchValue) => {
  return {
    type: SEARCH_PROVINCES,
    payload: { keyword: searchValue },
  };
};

export const searchProvincesSuccess = (provinces) => {
  return {
    type: SEARCH_PROVINCES_SUCCESS,
    payload: provinces,
  };
};

export const searchProvincesFailure = (error) => {
  return {
    type: SEARCH_PROVINCES_FAILURE,
    payload: error,
  };
};

export const addProvince = (province) => {
  return {
    type: ADD_PROVINCE,
    payload: province,
  };
};

export const addProvinceSuccess = () => {
  return {
    type: ADD_PROVINCE_SUCCESS,
  };
};

export const addProvinceFailure = (error) => {
  return {
    type: ADD_PROVINCE_FAILURE,
    payload: error,
  };
};

export const deleteProvince = (id) => {
  return {
    type: DELETE_PROVINCE,
    payload: id,
  };
};

export const deleteProvinceSuccess = () => {
  return {
    type: DELETE_PROVINCE_SUCCESS,
  };
};

export const deleteProvinceFailure = (error) => {
  return {
    type: DELETE_PROVINCE_FAILURE,
    payload: error,
  };
};

export const updateProvince = (province) => {
  return {
    type: UPDATE_PROVINCE,
    payload: province,
  };
};

export const updateProvinceSuccess = () => {
  return { 
    type: UPDATE_PROVINCE_SUCCESS, 
  };
};

export const updateProvinceFailure = (error) => {
  return { 
    type: UPDATE_PROVINCE_FAILURE, 
    payload: error 
  };
};
