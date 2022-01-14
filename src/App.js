import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {
  let a;
  const [genprice, setGenprice] = useState(null);
  const [input, setInput] = useState("LOVE");
  const [input2, setInput2] = useState("LOVE");

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setInput(searchTerm);
    setInput2("[נותנת לך 2 שניות להקליד...]");
    setGenprice("[בודקת...]");
    const delayDebounceFn = setTimeout(() => {
      update(searchTerm);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  let flag = true;

  async function getit() {
    setGenprice("[בודקת......]");
    const resa = await Axios.get("https://yoadprofr.herokuapp.com/thedata", {});
    return resa;
  }

  async function update(e) {
    setInput2(e);
    let res;
    res = await getit();
    let array = res.data.data;
    flag = true;
    setGenprice("");

    for (let index = 0; index < array.length; index++) {
      if (flag && array[index].symbol === e) {
        setGenprice(array[index].quote.USD.price);
        setInput(e);
        flag = false;
      }
    }
  }

  useEffect(async () => {
    setSearchTerm("LOVE");
    setInput2("LOVE");
    setInput2("LOVE");
    let res;
    res = await getit();
    let array = res.data.data;
    for (let index = 0; index < array.length; index++) {
      if (flag && array[index].symbol === "LOVE") {
        setGenprice(array[index].quote.USD.price);
        flag = false;
      }
    }
  }, []);

  return (
    <div className="App">
      <h1>
        הקלד מטבע:{" "}
        <input
          placeholder="למשל LOVE או BTC"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
      </h1>
      {genprice && (
        <h1>
          מחיר ה-{input2} הוא {genprice}
        </h1>
      )}
    </div>
  );
}

export default App;
