function SimilarDiamond({ items, loading }) {
  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-700 bg-[#1a1e3f]/70 p-4 animate-pulse"
          >
            <div className="h-32 bg-white/10 rounded-lg mb-3" />
            <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
            <div className="h-4 bg-white/10 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <div className="mt-8">
      <h4 className="text-xl font-semibold mb-4">Similar diamonds</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <a
            key={it.id}
            href={it.vendorUrl ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-slate-700 bg-[#1a1e3f]/70 p-4 hover:border-blue-400 transition"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-[#0e1230] flex items-center justify-center mb-3">
              {it.imageUrl ? (
                <img
                  src={it.imageUrl}
                  alt={it.title || "Diamond"}
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition"
                  loading="lazy"
                />
              ) : (
                <div className="text-slate-400 text-sm">No image</div>
              )}
            </div>

            <div className="space-y-1">
              <div className="font-semibold line-clamp-1">
                {it.title ?? `${it.shape} • ${it.carat} ct`}
              </div>
              <div className="text-sm text-slate-300">
                {it.shape} • {it.carat} ct • Color {it.color} • {it.clarity}
              </div>
              <div className="text-lg font-bold text-blue-300 mt-1">
                {typeof it.price === "number"
                  ? it.price.toLocaleString()
                  : it.price}{" "}
                {it.currency ?? "USD"}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SimilarDiamond;
