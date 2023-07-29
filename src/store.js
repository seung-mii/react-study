// store은 data(state)를 넣는 곳
// state는 이 application에서 바뀌는 data
// store가 하는 일은 기본적으로 나의 data를 넣을 수 있는 장소를 생성 
// redux는 data를 관리하는데 도와주는 역할을 하기 위해 만들어짐
import { configureStore, createSlice } from "@reduxjs/toolkit";

// createSlice 
// 초기 state, reducer 함수의 객체, "slice 이름" 을 받아 리듀서 및 state에 해당하는 action crator와 action type을 자동으로 생성하는 함수
// 내부적으로는 createAction 및 createReducer를 사용하므로 Immer를 사용하여 "mutating" 불변 업데이트를 작성할 수도 있다.
const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => state.filter(toDo => toDo.id !== action.payload)
  }
});

export const { add, remove } = toDos.actions;

// toDos.reducer : createSlice가 자동으로 Reducer를 우리에게 줌 !!!!!!
export default configureStore({ reducer: toDos.reducer });