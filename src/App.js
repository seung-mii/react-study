import { useState, useEffect } from "react";

function Hello() {
  useEffect(function () { // 함수
    console.log("hi :)");
    return function () {
      console.log("bye :(");
    };
  }, []);

  useEffect(() => { // 화살표 함수
    console.log("hi :)");
    return () => console.log("bye :("); // Cleanup function
    // component가 없어질 때도 function을 실행하고 싶으면 사용, 내부 코드가 return한 내용을 실행
    // 거의 사용 안하나 필요할 때가 잇음
  }, []);

  return <h1>Hello</h1>;
}

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);

  // useEffect의 첫 번째 인자는 우리가 실행하고 싶은 코드, 두 번째 인자는 React가 지켜보는 변수 배열(dependency), 변수의 값이 바뀌면 첫 번째 인자로 넣은 코드를 실행
  // 하지만 예를 들어 API를 통해 데이터를 가져오는 경우에는 리렌더링될 때마다 데이터를 가져오는 게 필요하지 않으므로 이런 경우 처음 한 번만 렌더링되고 다시는 실행되지 않도록 해야함 

  useEffect(() => {
    console.log("I run only once.");
  }, []);
  // 처음 한 번만 렌더링되고 다시는 실행되지 않음

  // counter가 변화할 때(버튼을 누를 때) 버튼과 관련없는 영화를 검색하고 있음
  // button을 누를 때가 아닌 movie state가 변화할 때만 user가 원하는 영화를 검색하고 싶음
  // -> 코드의 특정한 부분이 변화할 때 원하는 코드를 실행할 수 있는 방법
  useEffect(() => {
    // keyword에 아무것도 없을 때 렌더링이 되므로 조건 추가
    if (keyword !== "" && keyword.length > 3) {
      console.log("SEARCH FOR", keyword);      
    }
    console.log("I run when 'keyword' changes.");
  }, [keyword]);
  // keyword가 변할 때 내부 코드 실행

  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);

  useEffect(() => {
    console.log("I run when keyword or counter change");
  }, [keyword, counter]);
  // 둘 중 하나라도 변하면 내부 코드 실행

  const [showing, setShowing] = useState(false);
  const onClick2 = () => setShowing((prev) => !prev);

  return (
    <div>
      <div>
        <input
          value={keyword}
          onChange={onChange}
          type="text"
          placeholder="Search here..."
        />
        <h1>{counter}</h1>
        <button onClick={onClick}>click me</button>
      </div>
      <div>
        {showing ? <Hello /> : null}
        <button onClick={onClick2}>{showing ? "Hide" : "Show"}</button>
      </div>
    </div>
  );
  // state를 변경할 때마다 리렌더링되므로 모든 코드가 다시 실행됨 
}
export default App;



