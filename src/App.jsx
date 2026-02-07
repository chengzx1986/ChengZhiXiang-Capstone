import { useState } from "react";
import StockForm from "./Components/StockForm";
import StockList from "./Components/StockList";
import "./App.css";

async function fetchCurrentPrice(symbol, apiKey) {
  const url = new URL("https://www.alphavantage.co/query");
  url.searchParams.set("function", "GLOBAL_QUOTE");
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("apikey", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);

  const json = await res.json();
  const quote = json["Global Quote"];

  if (!quote || Object.keys(quote).length === 0) {
    const msg = json["Error Message"] || json["Note"] || "Invalid symbol or API limit reached.";
    throw new Error(msg);
  }

  const price = Number(quote["05. price"]);
  if (!Number.isFinite(price)) throw new Error("Could not read current price from API.");

  return price;
}

export default function App() {
  const [stocks, setStocks] = useState([]);
  const [status, setStatus] = useState("");

  // Put your real key here (or use env)
  const API_KEY = "0849cb6fa92401d1301736ab";

  async function handleAddStock({ symbol, quantity, purchasePrice }) {
    setStatus("");

    const cleanSymbol = symbol.trim().toUpperCase();
    const qty = Number(quantity);
    const buy = Number(purchasePrice);

    if (!cleanSymbol) return setStatus("Please enter a stock symbol.");
    if (!Number.isFinite(qty) || qty <= 0) return setStatus("Quantity must be > 0.");
    if (!Number.isFinite(buy) || buy <= 0) return setStatus("Purchase price must be > 0.");

    try {
      setStatus("Fetching current price...");
      const currentPrice = await fetchCurrentPrice(cleanSymbol, API_KEY);

      const profitLoss = (currentPrice - buy) * qty;

      const newStock = {
        id: crypto.randomUUID(),
        symbol: cleanSymbol,
        quantity: qty,
        purchasePrice: buy,
        currentPrice,
        profitLoss,
      };

      setStocks((prev) => [newStock, ...prev]);
      setStatus("");
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  }

  return (
    <div className="page">
      <h1 className="title">Finance Dashboard</h1>

      <StockForm onAddStock={handleAddStock} />

      {status && <p className="status">{status}</p>}

      <section className="listSection">
        <h2 className="sectionTitle">Stock List</h2>
        <div className="divider" />
        <StockList stocks={stocks} />
      </section>
    </div>
  );
}