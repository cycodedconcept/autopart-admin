
const CurrencyFormat = (amount: number = 0, currency: string = "NGN") => {
    const value = amount / 100
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0  
  }).format(value);
};

export default CurrencyFormat;
