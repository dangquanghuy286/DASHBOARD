import { combineReducers } from "redux";
import loginReducer from "./login";

const rootReducer = combineReducers({
    isLoggedIn: loginReducer,
});

export default rootReducer;
