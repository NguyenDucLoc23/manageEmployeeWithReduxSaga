import {
    GET_DISTRICTS,
    GET_DISTRICTS_SUCCESS,
    GET_DISTRICTS_FAILURE,
    SEARCH_DISTRICTS,
    SEARCH_DISTRICTS_SUCCESS,
    SEARCH_DISTRICTS_FAILURE,
    ADD_DISTRICT,
    ADD_DISTRICT_SUCCESS,
    ADD_DISTRICT_FAILURE,
    DELETE_DISTRICT,
    DELETE_DISTRICT_SUCCESS,
    DELETE_DISTRICT_FAILURE,
    UPDATE_DISTRICT,
    UPDATE_DISTRICT_SUCCESS,
    UPDATE_DISTRICT_FAILURE,
    GET_DISTRICTS_BY_PROVINCE,
    GET_DISTRICTS_BY_PROVINCE_SUCCESS,
    GET_DISTRICTS_BY_PROVINCE_FAILURE,
  } from "../constant/DistrictConstant";
  
  export const getDistricts = () => ({
    type: GET_DISTRICTS,
  });
  
  export const getDistrictsSuccess = (districts) => ({
    type: GET_DISTRICTS_SUCCESS,
    payload: districts,
  });
  
  export const getDistrictsFailure = (error) => ({
    type: GET_DISTRICTS_FAILURE,
    payload: error,
  });
  
  export const searchDistricts = (keyword) => ({
    type: SEARCH_DISTRICTS,
    payload: keyword,
  });
  
  export const searchDistrictsSuccess = (districts) => ({
    type: SEARCH_DISTRICTS_SUCCESS,
    payload: districts,
  });
  
  export const searchDistrictsFailure = (error) => ({
    type: SEARCH_DISTRICTS_FAILURE,
    payload: error,
  });
  
  export const addDistrict = (district) => ({
    type: ADD_DISTRICT,
    payload: district,
  });
  
  export const addDistrictSuccess = () => ({
    type: ADD_DISTRICT_SUCCESS,
  });
  
  export const addDistrictFailure = (error) => ({
    type: ADD_DISTRICT_FAILURE,
    payload: error,
  });
  
  export const deleteDistrict = (id) => ({
    type: DELETE_DISTRICT,
    payload: id,
  });
  
  export const deleteDistrictSuccess = () => ({
    type: DELETE_DISTRICT_SUCCESS,
  });
  
  export const deleteDistrictFailure = (error) => ({
    type: DELETE_DISTRICT_FAILURE,
    payload: error,
  });
  
  export const updateDistrict = (district) => ({
    type: UPDATE_DISTRICT,
    payload: district,
  });
  
  export const updateDistrictSuccess = () => ({
    type: UPDATE_DISTRICT_SUCCESS,
  });
  
  export const updateDistrictFailure = (error) => ({
    type: UPDATE_DISTRICT_FAILURE,
    payload: error,
  });
  
  export const getDistrictsByProvinces = (id) => {
    return { type: GET_DISTRICTS_BY_PROVINCE, payload: id };
  };
  
  export const getDistrictsByProvincesSuccess = (districts) => {
    return { type: GET_DISTRICTS_BY_PROVINCE_SUCCESS, payload: districts };
  };
  
  export const getDistrictsByProvincesFailure = (error) => {
    return { type: GET_DISTRICTS_BY_PROVINCE_FAILURE, payload: error };
  };
  