// SYSTEM FORMATTERS

export const numberFormatter = {
  integer: (value: string | number | undefined) => {
    if (!value) return "0";

    return Intl.NumberFormat("en-us", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(Number(value));
  },
  decimal: (value: string | number | undefined, dp: number = 2) => {
    if (!value) return "0";

    return Intl.NumberFormat("en-us", {
      maximumFractionDigits: dp,
      minimumFractionDigits: dp,
    }).format(Number(value));
  },
  currency: (value: string | number | undefined, currency: string = "$") => {
    if (!value) return "0";

    return Intl.NumberFormat("en-us", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      currency,
    }).format(Number(value));
  },
};
