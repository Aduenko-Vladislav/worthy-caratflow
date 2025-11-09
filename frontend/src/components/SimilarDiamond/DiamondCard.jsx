function DiamondCard({
  title,
  image,
  shape,
  carat,
  color,
  clarity,
  priceUSD,
  href,
}) {
  const Content = (
    <>
      <div className="aspect-square rounded-lg overflow-hidden bg-[#0e1230] flex items-center justify-center mb-3">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="text-slate-400 text-sm">No image</div>
        )}
      </div>

      <div className="space-y-1">
        <div className="font-semibold line-clamp-1">{title}</div>
        <div className="text-sm text-slate-300">
          {shape ?? "—"} • {carat} ct • Color {color ?? "—"} • {clarity ?? "—"}
        </div>
        <div className="text-lg font-bold text-blue-300 mt-1">{priceUSD}</div>
      </div>
    </>
  );

  const baseCls =
    "rounded-xl border border-slate-700 bg-[#1a1e3f]/70 p-4 hover:border-blue-400 transition";

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={baseCls}>
      {Content}
    </a>
  ) : (
    <div className={baseCls}>{Content}</div>
  );
}

export default DiamondCard;
