import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "../components/ToDo";

function Home({ toDos, addToDo }) {
  const [text, setText] = useState("");

  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    addToDo(text);
    setText("");
  }

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map(toDo => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

// mapStateToProps 함수를 사용해서 Home에다가 store로부터 state를 가져다 줌
function mapStateToProps(state) { // 여기서 인자로 넣은 state는 store의 state와 연결되어 같은 것임
  return { toDos: state };        // 여기서 return한 객체는 Home component의 props에 추가됨
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo: text => dispatch(actionCreators.addToDo(text))
    // return한 객체로 addToDo를 만듦으로써 또 Home component의 props에 addToDo라는 객체가 추가됨
    // 그리고 그 addToDo는 인자로 받은 text에 대하여 dispatch 함수의 reducer를 통해 store의 state를 수정함
  };
}

// connect()는 Home으로 보내는 props에 추가될 수 있도록 함
export default connect(mapStateToProps, mapDispatchToProps)(Home);