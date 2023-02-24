import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    // form이 input을 자동으로 submit 시키므로 button을 눌렀을 때 submit 되게 하기 위해 기본 동작을 막음
    if (toDo === "") { // toDo 가 비워져있으면
      return; // 함수가 작동되지 않도록 설정
    }

    // 값을 수정하는 두 가지 방법 ①②
    // ① 함수를 넣어 수정하는 방법
    setToDos((currentArray) => [toDo, ...currentArray]); 
    // ★★★★★ 우리는 절대 State를 직접적으로 수정할 수 없음
    // 대신 함수를 사용하여 함수가 toDo를 수정하는 역할을 수행
    // 함수를 사용할 때 React는 함수의 첫 번째 인자로 현재 state를 보냄
    // 여기서 currentArray = 현재 toDos임 

    // ...(스프레드 연산자) : array를 직접적으로 수정하지 않으면서 setToDos로 array에 element를 추가하는 방법
    // const food = [1, 2, 3, 4]
    // console.log([6, food]) → (2) [6, Array(4)]
    // console.log([6, ...food]) → (5) [6, 1, 2, 3, 4]
    
    // ② 직접 수정하는 방법
    setToDo(""); // input 비우기
  };

  console.log(toDos);
  console.log(toDos.map((item, index) => <li key={index}>{item}</li>));

  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do..."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          // map은 array를 가질 때 array 각각의 element들을 다 바꾸어 새로운 array를 가지고 싶을 때 사용 
          // map의 ()안에는 함수를 넣는데 이 함수는 array의 모든 item에 대하여 실행됨
          // 그 후 무엇을 return 하든지 그 return한 값이 새로운 array에 들어감
          
          // ["a", "b", "c", "d", "e", "f"].map(() => ":)") → (6) [":)", ":)", ":)", ":)", ":)", ":)"]
          // map은 배열의 길이만큼 () 내에 작성한 함수가 실행됨
          // ["a", "b", "c", "d", "e", "f"].map((item) => item.toUpperCase()) → (6) ["A", "B", "C", "D", "E", "F"]
          // map() 내 함수의 첫 번째 인자가 진행되고 있는 순서에 맞는 item임
          
          // 여기서 함수의 첫 번째 인자인 item은 각 todo를 의미함
          // 같은 component의 list를 render할 때 key라는 prop을 넣어주라는 warning이 떠서 함수의 두 번째 인자로 오는 index를 사용 

          <li key={index}>{item}</li>
          // array를 가져와서 array의 element를 변형해서 li로 보여줌 
        ))}
      </ul>
    </div>
  );
}

export default App;