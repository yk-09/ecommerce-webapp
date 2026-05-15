export function formatCurrency(currency: number): string{

  return ( currency / 100 ).toFixed(2);

}