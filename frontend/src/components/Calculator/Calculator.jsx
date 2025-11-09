import { useState } from "react";
import Field from "../Fields/Field";
import Select from "../Fields/Select";
import NumberInput from "../Fields/NumberInput";
import ResultCard from "../ResultCard/ResultCard";
import { getPriceThenSimilar } from "../../services/diamondService";
import SimilarDiamond from "../SimilarDiamond/SimilarDiamond.jsx";
import {
  SHAPES,
  COLORS,
  CLARITIES,
  GRADES,
  FLUORESCENCE,
} from "../../constants/diamondOptions";

const INITIAL = {
  shape: "Round",
  carat: 1.2,
  color: "F",
  clarity: "VS1",
  polish: "EX",
  symmetry: "VG",
  fluorescence: "N",
};

function Calculator() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setSimilar([]);
    setLoading(true);

    try {
      const { similar } = await getPriceThenSimilar(form, {
        onPrice: (priceData) => {
          setResult(priceData);
          setLoading(false);
          setSimilarLoading(true);
        },
      });

      setSimilar(similar);
    } catch (err) {
      setError(err.message || "Request failed");
    } finally {
      setSimilarLoading(false);
      setLoading(false);
    }
  };

  return (
    <section
      id="calculator"
      className="min-h-screen flex flex-col justify-center items-center  bg-linear-to-b from-[#8093fd] to-[#0e1230] text-white px-6 py-20"
    >
      <h2 className="text-4xl font-bold mb-10 text-center">
        Diamond Price Calculator
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6
                   bg-[#0e1230]/70 border border-slate-700 rounded-2xl p-8"
      >
        <Field label="Shape">
          <Select
            value={form.shape}
            onChange={(e) => update("shape", e.target.value)}
          >
            {SHAPES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Carat">
          <NumberInput
            min="0.01"
            step="0.01"
            value={form.carat}
            onChange={(e) => update("carat", e.target.value)}
          />
        </Field>

        <Field label="Color">
          <Select
            value={form.color}
            onChange={(e) => update("color", e.target.value)}
          >
            {COLORS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Clarity">
          <Select
            value={form.clarity}
            onChange={(e) => update("clarity", e.target.value)}
          >
            {CLARITIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Polish">
          <Select
            value={form.polish}
            onChange={(e) => update("polish", e.target.value)}
          >
            {GRADES.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Symmetry">
          <Select
            value={form.symmetry}
            onChange={(e) => update("symmetry", e.target.value)}
          >
            {GRADES.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Fluorescence">
          <Select
            value={form.fluorescence}
            onChange={(e) => update("fluorescence", e.target.value)}
          >
            {FLUORESCENCE.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </Select>
        </Field>

        <div className="md:col-span-2 flex justify-center pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-3 rounded-xl bg-blue-600 hover:bg-blue-500
                       font-semibold text-lg transition shadow-lg disabled:opacity-60"
          >
            {loading ? "Calculating..." : "Get Price"}
          </button>
        </div>
      </form>

      <ResultCard loading={loading} error={error} result={result} />

      <SimilarDiamond items={similar} loading={similarLoading} />
    </section>
  );
}

export default Calculator;
