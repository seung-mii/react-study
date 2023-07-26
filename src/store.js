// store은 data(state)를 넣는 곳
// state는 이 application에서 바뀌는 data
// store가 하는 일은 기본적으로 나의 data를 넣을 수 있는 장소를 생성 
// redux는 data를 관리하는데 도와주는 역할을 하기 위해 만들어짐
import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = text => {
  return {
    type: ADD,
    text,  // text : text랑 같은 뜻
    id: Date.now()
  };
};

const deleteToDo = id => {
  return {
    type: DELETE,
    id: parseInt(id)
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, {text: action.text, id: action.id}];
    case DELETE:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer); // createStore : store 생성

export const actionCreators = {
  addToDo,
  deleteToDo
};

export default store;