function NumberInput(props) {
  return (
    <input
      type="number"
      {...props}
      className="rounded-lg bg-[#1a1e3f] border border-slate-600 p-2
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default NumberInput;
