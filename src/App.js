import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers") // API 가져오기 
      .then((response) => response.json()) // API로부터 response를 받아서 response.json()을 리턴
      .then((json) => { // 리턴받은 json 사용 
        console.log(json); // (4705) [{...}, {...}, {...}, {...} ··· ]

        setCoins(json); // json 내용을 coins 배열에 저장
        setLoading(false); // 로딩이 끝남
      });
  }, []);
  // 한 번만 실행

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1> 
      {/* loading이 true라면 "" 를 리턴, 아니라면 coins.length를 보여줌 */}

      {loading ? ( 
        <strong>Loading...</strong>
      ) : (
        <ul>
          {coins.map((coin) => (
            // 애초에 코인들한테 id들이 다 있으므로 굳이 index 안해줘도 됨
            // coins 배열 중 하나의 object 내용
            // { id: "~", name: "~", symbol: "~", quotes: { USD: { price: ~, ··· }}, ···}
            
            <li key={coin.id}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </li>
          ))}
        </ul>
      )}
      {/* loading이 true라면 Loading... 을 리턴, 아니라면 coins.map 내용을 보여줌 */}
    </div>
  );
}

export default App;