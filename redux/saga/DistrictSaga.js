import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  getDistrictsSuccess,
  getDistrictsFailure,
  searchDistrictsSuccess,
  searchDistrictsFailure,
  addDistrictSuccess,
  addDistrictFailure,
  deleteDistrictSuccess,
  deleteDistrictFailure,
  updateDistrictSuccess,
  updateDistrictFailure,
  getDistrictsByProvincesSuccess,
  getDistrictsByProvincesFailure,
} from "../actions/DistrictActions";

import {
  GET_DISTRICTS,
  SEARCH_DISTRICTS,
  ADD_DISTRICT,
  DELETE_DISTRICT,
  UPDATE_DISTRICT,
  GET_DISTRICTS_BY_PROVINCE,
} from "../constant/DistrictConstant";

import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT;

function* getDistricts() {
  try {
    const response = yield call(axios.get, `${API_PATH}/api/districts/all`);
    yield put(getDistrictsSuccess(response.data));
  } catch (error) {
    yield put(getDistrictsFailure(error));
  }
}

function* searchDistricts(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_PATH}/api/districts/page`,
      action.payload
    );
    yield put(searchDistrictsSuccess(response.data));
  } catch (error) {
    yield put(searchDistrictsFailure(error));
  }
}

function* addDistrict(action) {
  try {
    yield call(axios.post, `${API_PATH}/api/districts`, action.payload);
    yield put(addDistrictSuccess());
    yield getDistricts();
  } catch (error) {
    yield put(addDistrictFailure(error));
  }
}

function* deleteDistrict(action) {
  try {
    yield call(axios.delete, `${API_PATH}/api/districts/${action.payload}`);
    yield put(deleteDistrictSuccess());
    yield getDistricts();
  } catch (error) {
    yield put(deleteDistrictFailure(error));
  }
}

function* updateDistrict(action) {
  try {
    yield call(
      axios.put,
      `${API_PATH}/api/districts/${action.payload.id}`,
      action.payload
    );
    yield put(updateDistrictSuccess());
    yield getDistricts();
  } catch (error) {
    yield put(updateDistrictFailure(error));
  }
}

function* getDistrictsByProvinces(action) {
  try {
    const response = yield call(
      axios.get,
      `${API_PATH}/api/provinces/${action.payload}/districts`
    );
    yield put(getDistrictsByProvincesSuccess(response.data));
  } catch (error) {
    yield put(getDistrictsByProvincesFailure(error));
  }
}

export default function* districtSaga() {
  yield takeLatest(GET_DISTRICTS, getDistricts);
  yield takeLatest(SEARCH_DISTRICTS, searchDistricts);
  yield takeLatest(ADD_DISTRICT, addDistrict);
  yield takeLatest(DELETE_DISTRICT, deleteDistrict);
  yield takeLatest(UPDATE_DISTRICT, updateDistrict);
  yield takeLatest(GET_DISTRICTS_BY_PROVINCE, getDistrictsByProvinces);
}
