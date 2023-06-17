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

export const getEmployees = () => ({
  type: GET_EMPLOYEES,
});

export const getEmployeesSuccess = (employees) => ({
  type: GET_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const getEmployeesFailure = (error) => ({
  type: GET_EMPLOYEES_FAILURE,
  payload: error,
});

export const getEmployeeDetail = (id) => ({
  type: GET_EMPLOYEE_DETAIL,
  payload: id,
});

export const getEmployeeDetailSuccess = (employee) => ({
  type: GET_EMPLOYEE_DETAIL_SUCCESS,
  payload: employee,
});

export const getEmployeeDetailFailure = (error) => ({
  type: GET_EMPLOYEE_DETAIL_FAILURE,
  payload: error,
});

export const searchEmployee = (searchValue) => ({
  type: SEARCH_EMPLOYEE,
  payload: { keyword: searchValue },
});

export const searchEmployeeSuccess = (employees) => ({
  type: SEARCH_EMPLOYEE_SUCCESS,
  payload: employees,
});

export const searchEmployeeFailure = (error) => ({
  type: SEARCH_EMPLOYEE_FAILURE,
  payload: error,
});

export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE,
  payload: id,
});

export const deleteEmployeeSuccess = () => ({
  type: DELETE_EMPLOYEE_SUCCESS,
})

export const deleteEmployeeFailure = (error) => ({
  type: DELETE_EMPLOYEE_FAILURE,
  payload: error,
});

export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: employee,
});

export const addEmployeeSuccess = (employee) => ({
  type: ADD_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const addEmployeeFailure = (error) => ({
  type: ADD_EMPLOYEE_FAILURE,
  payload: error,
});

export const updateEmployee = (employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: employee,
});

export const updateEmployeeSuccess = () => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
});

export const updateEmployeeFailure = (error) => ({
  type: UPDATE_EMPLOYEE_FAILURE,
  payload: error,
});