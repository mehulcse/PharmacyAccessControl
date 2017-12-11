/**
 * Created by mehulcse on 11/12/17.
 */

import users from "./user_reducers";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
  users
});

export default rootReducer;
