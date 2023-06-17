import axiosMiddleware from "redux-axios-middleware";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./reducers/RootReducer";
import HttpService from "app/services/HttpService";
import { composeWithDevTools } from 'redux-devtools-extension';
import RootSaga from "./saga/RootSaga";


const initialState = {};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  thunk,
  sagaMiddleware,
  axiosMiddleware(HttpService.getAxiosClient())
];

const enhancers = composeWithDevTools(applyMiddleware(...middlewares));

export const Store = createStore(
  RootReducer,
  initialState,
  enhancers
);

sagaMiddleware.run(RootSaga);
