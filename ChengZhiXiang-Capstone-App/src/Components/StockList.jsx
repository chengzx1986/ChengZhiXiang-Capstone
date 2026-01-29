function StockList({ stocks }) {
  return (
    <div>
      <h2>Stock List</h2>

      {stocks.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <ul>
          {stocks.map((stock, index) => (
            <li key={index}>
              {stock.symbol} – {stock.quantity} @ ${stock.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StockList;
