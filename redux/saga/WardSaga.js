import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  getWardsSuccess,
  getWardsFailure,
  searchWardsSuccess,
  searchWardsFailure,
  addWardSuccess,
  addWardFailure,
  deleteWardSuccess,
  deleteWardFailure,
  updateWardSuccess,
  updateWardFailure,
  getWardsByDistrictsSuccess,
  getWardsByDistrictsFailure,
} from "../actions/WardActions";
import ConstantList from "../../appConfig";
import {
  GET_WARDS,
  SEARCH_WARDS,
  ADD_WARD,
  DELETE_WARD,
  UPDATE_WARD,
  GET_WARDS_BY_DISTRICT,
} from "../constant/WardConstant";
const API_PATH = ConstantList.API_ENPOINT;

function* getWards() {
  try {
    const response = yield call(axios.get, `${API_PATH}/api/wards/all`);
    yield put(getWardsSuccess(response.data));
  } catch (error) {
    yield put(getWardsFailure(error));
  }
}

function* searchWards(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_PATH}/api/wards/page`,
      action.payload
    );
    yield put(searchWardsSuccess(response.data));
  } catch (error) {
    yield put(searchWardsFailure(error));
  }
}

function* addWard(action) {
  try {
    yield call(axios.post, `${API_PATH}/api/wards`, action.payload);
    yield put(addWardSuccess());
    yield getWards();
  } catch (error) {
    yield put(addWardFailure(error));
  }
}

function* deleteWard(action) {
  try {
    yield call(axios.delete, `${API_PATH}/api/wards/${action.payload}`);
    yield put(deleteWardSuccess());
    yield getWards();
  } catch (error) {
    yield put(deleteWardFailure(error));
  }
}

function* updateWard(action) {
  try {
    yield call(
      axios.put,
      `${API_PATH}/api/wards/${action.payload.id}`,
      action.payload.data
    );
    yield put(updateWardSuccess());
    yield getWards();
  } catch (error) {
    yield put(updateWardFailure(error));
  }
}

function* getWardsByDistricts(action) {
  try {
    const response = yield call(
      axios.get,
      `${API_PATH}/api/districts/${action.payload}/wards`
    );
    yield put(getWardsByDistrictsSuccess(response.data));
  } catch (error) {
    yield put(getWardsByDistrictsFailure(error));
  }
}

export default function* WardSaga() {
  yield takeLatest(GET_WARDS, getWards);
  yield takeLatest(SEARCH_WARDS, searchWards);
  yield takeLatest(ADD_WARD, addWard);
  yield takeLatest(DELETE_WARD, deleteWard);
  yield takeLatest(UPDATE_WARD, updateWard);
  yield takeLatest(GET_WARDS_BY_DISTRICT, getWardsByDistricts);
}
