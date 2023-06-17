import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  getProvincesSuccess,
  getProvincesFailure,
  searchProvincesSuccess,
  searchProvincesFailure,
  addProvinceSuccess,
  addProvinceFailure,
  deleteProvinceSuccess,
  deleteProvinceFailure,
  updateProvinceSuccess,
  updateProvinceFailure,
} from "../actions/ProvinceActions";

import ConstantList from "../../appConfig";
import {
  GET_PROVINCES,
  SEARCH_PROVINCES,
  ADD_PROVINCE,
  DELETE_PROVINCE,
  UPDATE_PROVINCE
} from "../constant/ProvinceConstant";
const API_PATH = ConstantList.API_ENPOINT;

function* getProvinces() {
  try {
    const response = yield call(axios.get, `${API_PATH}/api/provinces/all`);
    yield put(getProvincesSuccess(response.data.data));
  } catch (error) {
    yield put(getProvincesFailure(error));
  }
}

function* searchProvinces(action) {
  try {
    const response = yield call(axios.post, `${API_PATH}/api/provinces/page`, action.payload);
    yield put(searchProvincesSuccess(response.data));
  } catch (error) {
    yield put(searchProvincesFailure(error));
  }
}

function* addProvince(action) {
  try {
    yield call(axios.post, `${API_PATH}/api/provinces`, action.payload);
    yield put(addProvinceSuccess());
    yield getProvinces();
  } catch (error) {
    yield put(addProvinceFailure(error));
  }
}

function* deleteProvince(action) {
  try {
    yield call(axios.delete, `${API_PATH}/api/provinces/${action.payload}`);
    yield put(deleteProvinceSuccess());
    yield getProvinces()
  } catch (error) {
    yield put(deleteProvinceFailure(error));
  }
}

function* updateProvince(action) {
  try {
    yield call(axios.put, `${API_PATH}/api/provinces/${action.payload.id}`, action.payload);
    yield put(updateProvinceSuccess());
    yield getProvinces()
  } catch (error) {
    yield put(updateProvinceFailure(error));
  }
}

export default function* provinceSaga() {
  yield takeLatest(GET_PROVINCES, getProvinces);
  yield takeLatest(SEARCH_PROVINCES, searchProvinces);
  yield takeLatest(ADD_PROVINCE, addProvince);
  yield takeLatest(DELETE_PROVINCE, deleteProvince);
  yield takeLatest(UPDATE_PROVINCE, updateProvince);
}
