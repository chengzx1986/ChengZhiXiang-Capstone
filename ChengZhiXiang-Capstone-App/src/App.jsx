import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StockForm from "./Components/StockForm";
import StockList from "./Components/StockList";

function App() {
  const [stocks, setStocks] = useState([]);
  
  function addStock(stock) {
    setStocks([...stocks, stock]);
  }
    return (
    <div style={{ padding: "40px", maxWidth: "800px" }}>
      <h1>Finance Dashboard</h1>
      <StockForm onAddStock={addStock} />

      <StockList stocks={stocks} />
    </div>
  );
}

export default App;
