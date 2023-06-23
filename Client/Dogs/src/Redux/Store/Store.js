import { createStore, combineReducers, applyMiddleware } from "redux";
import filtersReducer from "../Reducer/Reducer";
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  filters: filtersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
