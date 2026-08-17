
const CurrencyFormat = (currency: string = "NGN") => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0  
  });
};

export default CurrencyFormat;
