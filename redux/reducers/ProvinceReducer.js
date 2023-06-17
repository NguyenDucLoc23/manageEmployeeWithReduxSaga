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

const initialState = {
  provinces: [],
  error: null,
};

function provinceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROVINCES:
      return {
        ...state,
        error: null,
      };
    case GET_PROVINCES_SUCCESS:
      return {
        ...state,
        provinces: action.payload,
      };
    case GET_PROVINCES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case SEARCH_PROVINCES:
      return {
        ...state,
        error: null,
      };
    case SEARCH_PROVINCES_SUCCESS:
      return {
        ...state,
        provinces: action.payload.data.content,
      };
    case SEARCH_PROVINCES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_PROVINCE:
      return {
        ...state,
        error: null,
      };
    case ADD_PROVINCE_SUCCESS:
      return {
        ...state,
      };
    case ADD_PROVINCE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_PROVINCE:
      return {
        ...state,
        error: null,
      };
    case DELETE_PROVINCE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_PROVINCE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_PROVINCE:
      return {
        ...state,
        error: null,
      };
    case UPDATE_PROVINCE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PROVINCE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default provinceReducer;
