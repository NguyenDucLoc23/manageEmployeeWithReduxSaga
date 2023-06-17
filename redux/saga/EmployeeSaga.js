import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {
  getEmployeesFailure,
  getEmployeesSuccess,
  searchEmployeeSuccess,
  searchEmployeeFailure,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  addEmployeeSuccess,
  addEmployeeFailure,
  updateEmployeeSuccess,
  updateEmployeeFailure
} from "../actions/EmployeeAction";

import { 
  GET_EMPLOYEES, SEARCH_EMPLOYEE, DELETE_EMPLOYEE, ADD_EMPLOYEE, UPDATE_EMPLOYEE
 } from "../constant/EmployeeConstant";

import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT;

function* getEmployees() {
  try {
    const response = yield call(axios.get, `${API_PATH}/api/employees/all`);
    yield put(getEmployeesSuccess(response.data.data));
  } catch (error) {
    yield put(getEmployeesFailure(error));
  }
}

function* searchEmployees(action) {
  try {
    const { keyword } = action.payload;

    const response = yield call(axios.post,`${API_PATH}/api/employees/page`,keyword);
    yield put(searchEmployeeSuccess(response.data));
  } catch (error) {
    yield put(searchEmployeeFailure(error));
  }
}

function* deleteEmployee(action) {
  try {
    yield call(axios.delete, `${API_PATH}/api/employees/${action.payload}`);
    yield put(deleteEmployeeSuccess());
    yield getEmployees();
  } catch (error) {
    yield put(deleteEmployeeFailure(error));
  }
}

function* addEmployee(action) {
  try {
    const res = yield call(axios.post, `${API_PATH}/api/employees`, action.payload)
    yield put(addEmployeeSuccess(res.data));
    yield getEmployees();
  } catch (error) {
    yield put(addEmployeeFailure(error))
  }
}

function* updateEmployee(action) {
  try {
    yield call(axios.put,`${API_PATH}/api/employees/${action.payload.id}`,action.payload);
    yield put(updateEmployeeSuccess());
    yield getEmployees();
  } catch (error) {
    yield put(updateEmployeeFailure(error));
  }
}

export default function* EmployeeSaga() {
  yield takeLatest(GET_EMPLOYEES, getEmployees);
  yield takeLatest(SEARCH_EMPLOYEE, searchEmployees);
  yield takeLatest(DELETE_EMPLOYEE, deleteEmployee);
  yield takeLatest(ADD_EMPLOYEE, addEmployee);
  yield takeLatest(UPDATE_EMPLOYEE, updateEmployee);
}
