function ResultCard({ loading, error, result }) {
  if (loading) {
    return (
      <div className="mt-10 bg-[#1a1e3f]/80 border border-slate-700 rounded-2xl px-10 py-6 text-center shadow-xl">
        <p className="text-slate-300">Calculating…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="mt-10 bg-red-500/10 border border-red-400/40 rounded-2xl px-10 py-6 text-center shadow-xl">
        <p className="text-red-300">{error}</p>
      </div>
    );
  }
  if (!result) return null;

  const { price, currency = "USD" } = result;
  return (
    <div className="mt-10 bg-[#1a1e3f]/80 border border-slate-700 rounded-2xl px-10 py-6 text-center shadow-xl">
      <h3 className="text-2xl font-semibold mb-2">Estimated Price</h3>
      <p className="text-4xl font-bold text-blue-300">
        {typeof price === "number" ? price.toLocaleString() : price} {currency}
      </p>
    </div>
  );
}

export default ResultCard;
