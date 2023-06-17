import {
  GET_WARDS,
  GET_WARDS_SUCCESS,
  GET_WARDS_FAILURE,
  SEARCH_WARDS,
  SEARCH_WARDS_SUCCESS,
  SEARCH_WARDS_FAILURE,
  ADD_WARD,
  ADD_WARD_SUCCESS,
  ADD_WARD_FAILURE,
  UPDATE_WARD,
  UPDATE_WARD_SUCCESS,
  UPDATE_WARD_FAILURE,
  DELETE_WARD,
  DELETE_WARD_SUCCESS,
  DELETE_WARD_FAILURE,
  GET_WARDS_BY_DISTRICT,
  GET_WARDS_BY_DISTRICT_SUCCESS,
  GET_WARDS_BY_DISTRICT_FAILURE,
} from "../constant/WardConstant";

export const getWards = () => {
  return { type: GET_WARDS };
};

export const getWardsSuccess = (wards) => {
  return { type: GET_WARDS_SUCCESS, payload: wards };
};

export const getWardsFailure = (error) => {
  return { type: GET_WARDS_FAILURE, payload: error };
};

export const searchWards = (searchValue) => {
  return { type: SEARCH_WARDS, payload: { keyword: searchValue } };
};

export const searchWardsSuccess = (wards) => {
  return { type: SEARCH_WARDS_SUCCESS, payload: wards };
};

export const searchWardsFailure = (error) => {
  return { type: SEARCH_WARDS_FAILURE, payload: error };
};

export const addWard = (ward) => {
  return { type: ADD_WARD, payload: ward };
};

export const addWardSuccess = (ward) => {
  return { type: ADD_WARD_SUCCESS };
};

export const addWardFailure = (error) => {
  return { type: ADD_WARD_FAILURE, payload: error };
};

export const updateWard = (ward) => {
  return { type: UPDATE_WARD, payload: ward };
};

export const updateWardSuccess = (ward) => {
  return { type: UPDATE_WARD_SUCCESS };
};

export const updateWardFailure = (error) => {
  return { type: UPDATE_WARD_FAILURE, payload: error };
};

export const deleteWard = (id) => {
  return { type: DELETE_WARD, payload: id };
};

export const deleteWardSuccess = (id) => {
  return { type: DELETE_WARD_SUCCESS };
};

export const deleteWardFailure = (error) => {
  return { type: DELETE_WARD_FAILURE, payload: error };
};

export const getWardsByDistricts = (id) => {
  return { type: GET_WARDS_BY_DISTRICT, payload: id };
};

export const getWardsByDistrictsSuccess = (id) => {
  return { type: GET_WARDS_BY_DISTRICT_SUCCESS, payload: id };
};

export const getWardsByDistrictsFailure = (id) => {
  return { type: GET_WARDS_BY_DISTRICT_FAILURE, payload: id };
};