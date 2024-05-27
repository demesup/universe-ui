export function useAmount() {
  function calculateNetto(price: number, discount: number, count: number): number {
    const amount = price * count
    const discountValue = (amount * discount) / 100
    return amount - discountValue
  }

  function calculateVat(netto: number, vat: number): number {
    return (netto * vat) / 100
  }

  function calculateBrutto(netto: number, vat: number): number {
    return netto + vat
  }

  return { calculateNetto, calculateVat, calculateBrutto }
}
