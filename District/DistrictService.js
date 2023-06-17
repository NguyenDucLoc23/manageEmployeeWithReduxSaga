import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT;

export const getProvince = (object) => {
  return axios.get(API_PATH + "/api/provinces/all", object);
};

export const getAllListEmployee = () => {
  const url = API_PATH + '/api/employees/all';
  return axios.get(url)
}