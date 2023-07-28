// store은 data(state)를 넣는 곳
// state는 이 application에서 바뀌는 data
// store가 하는 일은 기본적으로 나의 data를 넣을 수 있는 장소를 생성 
// redux는 data를 관리하는데 도와주는 역할을 하기 위해 만들어짐
import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

console.log(addToDo());    // {type: "ADD", payload: undefined}
console.log(deleteToDo()); // {type: "DELETE", payload: undefined}

// const reducer = (state = [], action) => {
//   switch (action.type) {
//     case addToDo.type:
//       console.log(action); // {type: "ADD", payload: "사용자가 추가한 to do 내용"}
//       return [{ text: action.payload, id: Date.now() }, ...state];
//     case deleteToDo.type:
//       return state.filter(toDo => toDo.id !== action.payload);
//     default:
//       return state;
//   }
// };

const reducer = createReducer([], (builder) => {
  builder
  .addCase(addToDo, (state, action) => {
    console.log(action); // {type: "ADD", payload: "사용자가 추가한 to do 내용"}
    state.push({ id: Date.now(), text: action.payload });  // 수정된 새로운 array를 return 안하고 state만 수정
    // toolkit을 사용하면 state를 수정, mutate할 수 있음 (더이상 새로운 list를 반환하지 않아도 됨!)
    // 왜냐하면 state를 mutate하는 것은 안되지만 toolkit 내에선 우리가 state를 mutate해도 toolkit이 이전에 사용한 코드처럼 변경을 해줘서 에러 X
  
  })
  .addCase(deleteToDo, (state, action) => {
    return state.filter((toDo) => toDo.id !== action.payload);
    // filter는 state를 mutate하는 것이 아니라 새로운 array를 return하는 것
  });
});

const store = configureStore({ reducer });
// configureStore를 사용하면 Redux Developer Tools를 쓸 수 있음 

export const actionCreators = {
  addToDo,
  deleteToDo
};

export default store;