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
  
  const initialState = {
    districts: [],
    error: null,
  };
  
  function DistrictReducer(state = initialState, action) {
    switch (action.type) {

      case GET_DISTRICTS:
        return {
          ...state,
          error: null,
        };
      case GET_DISTRICTS_SUCCESS:
        return {
          ...state,
          districts: action.payload.data,
        };
      case GET_DISTRICTS_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
  
      case SEARCH_DISTRICTS:
        return {
          ...state,
          error: null,
        };
      case SEARCH_DISTRICTS_SUCCESS:
        return {
          ...state,
          districts: action.payload.data.content,
        };
      case SEARCH_DISTRICTS_FAILURE:
        return {
          ...state,
          error: action.payload,
        };

      case ADD_DISTRICT:
        return {
          ...state,
          error: null,
        };
      case ADD_DISTRICT_SUCCESS:
        return {
          ...state,
        };
      case ADD_DISTRICT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
  
      case DELETE_DISTRICT:
        return {
          ...state,
          loading: true,
        };
      case DELETE_DISTRICT_SUCCESS:
        return {
          ...state,
        };
      case DELETE_DISTRICT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
  
      case UPDATE_DISTRICT:
        return {
          ...state,
          error: null,
        };
      case UPDATE_DISTRICT_SUCCESS:
        return {
          ...state,
        };
      case UPDATE_DISTRICT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
  
      case GET_DISTRICTS_BY_PROVINCE:
        return {
          ...state,
          error: null,
        };
      case GET_DISTRICTS_BY_PROVINCE_SUCCESS:
        return {
          ...state,
          districts: action.payload.data,
        };
      case GET_DISTRICTS_BY_PROVINCE_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
  
      default:
        return state;
    }
  }
  
  export default DistrictReducer;
  