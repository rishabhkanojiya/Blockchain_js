import { combineReducers } from "redux";
import InputReducer from "./InputReducer";
import BlockData from "./BlockData";
import TransactionData from "./TransactionData";
import AddressData from "./AddressData";

export default combineReducers({
  inputs: InputReducer,
  blockData: BlockData,
  transaction: TransactionData,
  address: AddressData
});
