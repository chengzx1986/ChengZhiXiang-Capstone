import { useState } from "react";

function StockForm({ onAddStock }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit() {
    if (!symbol || !quantity || !price) return;

    onAddStock({
      symbol,
      quantity: Number(quantity),
      price: Number(price),
    });

    // reset form
    setSymbol("");
    setQuantity("");
    setPrice("");
  }

  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "30px" }}>
      <input
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        type="number"
        placeholder="Purchase Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Add Stock
      </button>
    </div>
  );
}

export default StockForm;