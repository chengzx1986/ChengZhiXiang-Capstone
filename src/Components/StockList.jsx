import { useContext } from "react";
import StockContext from "../context/StockContext";

function StockList() {
  const {stocks} = useContext(StockContext);

  if (!stocks || stocks.length === 0) {
    return <p className="empty">No stocks added yet.</p>;
  }

  return (
    <div className="cards">
      {stocks.map((s) => {
        const isProfit = s.profitLoss >= 0;
        const plClass = isProfit ? "pl profit" : "pl loss";
        const sign = isProfit ? "+" : "-";

        return (
          <div className="card" key={s.id}>
            <p className="line">
              <span className="label strong">Symbol:</span> {s.symbol}
            </p>
            <p className="line">
              <span className="label">Quantity:</span> {s.quantity}
            </p>
            <p className="line">
              <span className="label">Purchase Price:</span>{" "}
              {s.purchasePrice.toFixed(2)}
            </p>
            <p className="line">
              <span className="label">Current Price:</span>{" "}
              {s.currentPrice.toFixed(2)}
            </p>
            <p className={plClass}>
              Profit/Loss: {sign}
              {Math.abs(s.profitLoss).toFixed(2)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default StockList;