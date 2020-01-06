import * as types from './mutation-types';

export const newDira = ({ commit }, payload) => {
  commit(types.UPDATE_DIRA, payload);
};

export const addDira = ({state: {dira}}) => {
  chrome.runtime.sendMessage({message: "addDira", dira}, () => {});
}
