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
  DELETE_WARD,
  DELETE_WARD_SUCCESS,
  DELETE_WARD_FAILURE,
  UPDATE_WARD,
  UPDATE_WARD_SUCCESS,
  UPDATE_WARD_FAILURE,
  GET_WARDS_BY_DISTRICT,
  GET_WARDS_BY_DISTRICT_SUCCESS,
  GET_WARDS_BY_DISTRICT_FAILURE,
} from "../constant/WardConstant";

const initialState = {
  wards: [],
  error: null,
};

function wardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WARDS:
      return {
        ...state,
        error: null,
      };
    case GET_WARDS_SUCCESS:
      return {
        ...state,
        wards: action.payload.data,
      };
    case GET_WARDS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case SEARCH_WARDS:
      return {
        ...state,
        error: null,
      };
    case SEARCH_WARDS_SUCCESS:
      return {
        ...state,
        wards: action.payload.data.content,
      };
    case SEARCH_WARDS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_WARD:
      return {
        ...state,
        error: null,
      };
    case ADD_WARD_SUCCESS:
      return {
        ...state,
      };
    case ADD_WARD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_WARD:
      return {
        ...state,
        error: null,
      };
    case DELETE_WARD_SUCCESS:
      return {
        ...state,
      };
    case DELETE_WARD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_WARD:
      return {
        ...state,
        error: null,
      };

    case UPDATE_WARD_SUCCESS:
      return {
        ...state,
      };

    case UPDATE_WARD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case GET_WARDS_BY_DISTRICT:
      return {
        ...state,
        error: null,
      };
    case GET_WARDS_BY_DISTRICT_SUCCESS:
      return {
        ...state,
        wards: action.payload.data,
      };
    case GET_WARDS_BY_DISTRICT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
export default wardReducer;
