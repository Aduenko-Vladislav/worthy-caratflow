export function formToPrice(form) {
  return {
    shape: form.shape,
    carat: Number(form.carat),
    color: form.color,
    clarity: form.clarity,
    polish: form.polish,
    symmetry: form.symmetry,
    fluorescence: form.fluorescence,
  };
}

export function formToSimilar(form) {
  return {
    shape: form.shape,
    carat: Number(form.carat),
    color: form.color,
    clarity: form.clarity,
  };
}
