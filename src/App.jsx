import {
  useEffect,
  useState,
  useContext,
  useRef,
  useReducer,
  useMemo,
  useCallback
} from "react";
import "./App.css";
import MyInfoContext from "./main";
import SomeChild from "./SomeChild";
import { useLocalStorage } from "./UseLocalStorage";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case `decrement`:
      return state - 1;
    default:
      return state;
  }
};
function App() {
  //状態を変更するuseState
  const [count, setCount] = useState(0);
  const handleCount = () => {
    setCount(count + 1);
  };

  //Context
  const myInfo = useContext(MyInfoContext);

  //UseRef
  const ref = useRef();
  const handleRef = () => {
    console.log(ref.current.value);
  };

  //[]の中に変数を入れると、その変数が変更された時だけ実行される
  useEffect(() => {
    console.log("useEffect");
  }, [count]);

  //useReducer
  const [state, dispatch] = useReducer(reducer, 0);

  //UseMemo 値をキャッシュする
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);
  // const square = () => {
  //   let i = 0;
  //   while (i < 2000000000){{
  //      i++;
  //   }
  //   return count02 * count02;
  // }};

  const square = useMemo(() => {
    let i = 0;
    while (i < 200000000) {
      i++;
    }
    return count02 * count02;
  }, [count02]);

  //useCallback関数のメモ化
  const [counter, setCounter] = useState(0);
  // const showCount =() => {
  //   alert("これは重い処理です")
  // };
  const showCount = useCallback(() => {
    alert("これは重い処理です")
  },[counter]);

  //カスタムHook
  const [age, setAge] = useLocalStorage("age", 43);

  return (
    <div className="App">
      <h1>useState, useEffect</h1>
      <button className={"button"} onClick={handleCount}>
        +
      </button>
      <p>{count}</p>

      <hr />
      <h1>useContext</h1>
      {/* バケツリレーをしなくても、親から子、孫、ひ孫に渡すことができる */}
      <p>{myInfo.name}</p>
      <p>{myInfo.age}</p>

      <hr />
      <h1>useRef</h1>
      {/*入力された文字列などを参照できる*/}
      <input type="text" ref={ref} />
      <button className={"button"} onClick={handleRef}>
        useRef
      </button>

      <hr />
      {/*あまり使わない*/}
      {/*Reduxに関連している*/}
      <h1>useReducer</h1>
      <button
        className={"button"}
        onClick={() => dispatch({ type: "increment" })}
      >
        +
      </button>
      <button
        className={"button"}
        onClick={() => dispatch({ type: "decrement" })}
      >
        -
      </button>
      <p>カウント：{state}</p>

      <hr />
      {/*あまり使わない*/}
      {/*重い処理や必要のない挙動を防ぐ　パフォーマンスのチューニング　※
      ただしメモリを使うので乱用はＮＧ*/}
      <h1>useMemo</h1>
      <div>カウント１:{count01}</div>
      <div>カウント2 :{count02}</div>
      <div>結果:{square}</div>
      <button className={"button"} onClick={() => setCount01(count01 + 1)}>+</button>
      <button className={"button"} onClick={() => setCount02(count02 + 1)}>+</button>
      <hr />
  
      {/*useMemoの関数版*/}
      <h1>useCallback</h1>
      <SomeChild showCount={showCount} />

      <hr />
      <h1>カスタムHook</h1>
      <p>{age}</p>
      <button className={"button"} onClick={() => setAge(80)}>年齢をセット</button>

    </div>
  );
}

export default App;
