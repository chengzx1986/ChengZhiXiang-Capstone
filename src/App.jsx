import { useCallback, useEffect, useState } from "react";
import StockForm from "./Components/StockForm";
import StockList from "./Components/StockList";
import StockContext from "./context/StockContext";

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
    const msg =
      json["Error Message"] ||
      json["Note"] ||
      "Invalid symbol or API limit reached.";
    throw new Error(msg);
  }

  const price = Number(quote["05. price"]);
  if (!Number.isFinite(price)) {
    throw new Error("Could not read current price from API.");
  }

  return price;
}

function App() {
  const [stocks, setStocks] = useState([]);
  const [status, setStatus] = useState("");
  const [pendingStock, setPendingStock] = useState(null);

  const API_KEY = "0849cb6fa92401d1301736ab"; 

  // Event handler: validate + store intent
  const handleAddStock = useCallback(function({ symbol, quantity, purchasePrice }) {
    setStatus("");

    const cleanSymbol = symbol.trim().toUpperCase();
    const qty = Number(quantity);
    const buy = Number(purchasePrice);

    if (!cleanSymbol) return setStatus("Please enter a stock symbol.");
    if (!Number.isFinite(qty) || qty <= 0)
      return setStatus("Quantity must be > 0.");
    if (!Number.isFinite(buy) || buy <= 0)
      return setStatus("Purchase price must be > 0.");

    setPendingStock({
      symbol: cleanSymbol,
      quantity: qty,
      purchasePrice: buy,
    });
  }, []);

  // Side effect: fetch price when pendingStock changes
  useEffect(() => {
    if (!pendingStock) return;

    let cancelled = false;

    async function fetchAndAddStock() {
      try {
        setStatus("Fetching current price...");

        const currentPrice = await fetchCurrentPrice(
          pendingStock.symbol,
          API_KEY
        );

        if (cancelled) return;

        const profitLoss =
          (currentPrice - pendingStock.purchasePrice) *
          pendingStock.quantity;

        const newStock = {
          id: crypto.randomUUID(),
          symbol: pendingStock.symbol,
          quantity: pendingStock.quantity,
          purchasePrice: pendingStock.purchasePrice,
          currentPrice,
          profitLoss,
        };

        setStocks((prev) => [newStock, ...prev]);
        setPendingStock(null);
        setStatus("");
      } catch (err) {
        if (!cancelled) {
          setStatus(`Error: ${err.message}`);
          setPendingStock(null);
        }
      }
    }

    fetchAndAddStock();

    return () => {
      cancelled = true;
    };
  }, [pendingStock, API_KEY]);

  // Render
  return (
    <StockContext.Provider value = {{stocks}}>
      <div className="page">
        <h1 className="title">Finance Dashboard</h1>

        <StockForm onAddStock={handleAddStock} />

        {status && <p className="status">{status}</p>}

        <section className="listSection">
          <h2 className="sectionTitle">Stock List</h2>
          <div className="divider" />
          <StockList />
        </section>
      </div>
    </StockContext.Provider>
  );
}


export default App;