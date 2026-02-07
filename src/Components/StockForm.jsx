import { useState } from "react";

export default function StockForm({ onAddStock }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  function submit(e) {
    e.preventDefault();
    onAddStock({ symbol, quantity, purchasePrice });
  }

  return (
    <form className="formRow" onSubmit={submit}>
      <input
        className="input"
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        className="input"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        className="input"
        placeholder="Purchase Price"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
      />
      <button className="primaryBtn" type="submit">
        Add Stock
      </button>
    </form>
  );
}