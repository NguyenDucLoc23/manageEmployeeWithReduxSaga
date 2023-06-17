import {
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  GET_EMPLOYEE_DETAIL,
  GET_EMPLOYEE_DETAIL_SUCCESS,
  GET_EMPLOYEE_DETAIL_FAILURE,
  SEARCH_EMPLOYEE,
  SEARCH_EMPLOYEE_SUCCESS,
  SEARCH_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
} from "../constant/EmployeeConstant";

const initState = {
  listStaff: [],
  error: null,
};

const EmployeeReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        error: null,
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        listStaff: action.payload,
      };
    case GET_EMPLOYEES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case GET_EMPLOYEE_DETAIL:
      return {
        ...state,
        error: null,
      };

    case GET_EMPLOYEE_DETAIL_SUCCESS:
      return {
        ...state,
        employee: action.payload.data,
      };
    case GET_EMPLOYEE_DETAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case SEARCH_EMPLOYEE:
      return {
        ...state,
        error: null,
      };
    case SEARCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        listStaff: action.payload.data.content,
      };
    case SEARCH_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_EMPLOYEE:
      return {
        ...state,
        error: null,
      };

    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_EMPLOYEE:
      return {
        ...state,
        error: null,
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: action.payload.data,
      };
    case ADD_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

      case UPDATE_EMPLOYEE:
        return {
          ...state,
          error: null,
        };
      case UPDATE_EMPLOYEE_SUCCESS:
        return {
          ...state,
        };
      case UPDATE_EMPLOYEE_FAILURE:
        return {
          ...state,
          error: action.payload,
        };

    default: {
      return {
        ...state,
      };
    }
  }
};

export default EmployeeReducer;
