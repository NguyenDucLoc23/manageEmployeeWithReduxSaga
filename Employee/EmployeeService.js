import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT;

export const getProvince = (object) => {
  return axios.get(API_PATH + "/api/provinces/all", object);
};

export const getDistrictByProvince = async (id) => {
  return await axios.get(API_PATH + `/api/provinces/${id}/districts`)
}

export const getWardByDistrict = async (id) => {
  return await axios.get(API_PATH + `/api/districts/${id}/wards`)
}

export const getAllCertificates = () => {
  const url = API_PATH + '/api/certificates/all'
  return axios.get(url)
}

export const getCertificateByEmployee = (id) => {
  const url = API_PATH + '/employee-certificates/' + id;
  return axios.get(url)
}

export const getAllCertificatesEmployee = () => {
  const url = API_PATH + '/employee-certificates/all'
  return axios.get(url)
}

export const addCertificates = (object) => {
  const url = API_PATH + '/api/certificates'
  return axios.post(url,object)
}

export const addCertificateEmployee = (object) => {
  const url = API_PATH + '/employee-certificates'
  return axios.post(url,object)
}

export const getCertificateById = (id) => {
  const url = API_PATH + '/api/certificates/' + id;
  return axios.get(url)
}

export const deleteCertificateEmployee = (id) => {
  const url = API_PATH + '/employee-certificates/' + id;
  return axios.delete(url)
}