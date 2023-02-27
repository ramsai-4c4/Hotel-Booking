import { legacy_createStore as createStore } from "redux";
import { addreducer } from "./addreducer";
const store =createStore(addreducer);
export default store