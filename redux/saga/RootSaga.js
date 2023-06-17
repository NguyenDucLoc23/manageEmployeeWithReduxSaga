import { all } from "redux-saga/effects";

import EmployeeSaga from "./EmployeeSaga";
import ProvinceSaga from "./ProvinceSaga";
import DistrictSaga from "./DistrictSaga";
import WardSaga from "./WardSaga";
import CertificateSaga from "./CertificateSaga";

export default function* rootSaga() {
  yield all([EmployeeSaga(),ProvinceSaga(),DistrictSaga(),WardSaga(),CertificateSaga()]);
}
