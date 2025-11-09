export function formToPayload(form) {
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