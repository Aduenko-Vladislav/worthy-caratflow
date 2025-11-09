import DiamondCard from "./DiamondCard";

function SimilarDiamond({ items = [], loading = false }) {
  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!items.length) return null;

  return (
    <section className="mt-8">
      <h4 className="text-xl font-semibold mb-4">Similar diamonds</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it, i) => (
          <DiamondCard
            key={it._id || it.id || i}
            title={`${it.shape ?? "Diamond"} • ${it.carat} ct`}
            image={it.image}
            shape={it.shape}
            carat={it.carat}
            color={it.color}
            clarity={it.clarity}
            priceUSD={it.priceUSD}
            href={it.vendorUrl}
          />
        ))}
      </div>
    </section>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-700 bg-[#1a1e3f]/70 p-4 animate-pulse">
      <div className="h-32 bg-white/10 rounded-lg mb-3" />
      <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
      <div className="h-4 bg-white/10 rounded w-1/2" />
    </div>
  );
}

export default SimilarDiamond;
