function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-slate-300">{label}</span>
      {children}
    </label>
  );
}

export default Field;
