function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="rounded-lg bg-[#1a1e3f] border border-slate-600 p-2
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </select>
  );
}

export default Select;
