export function generateReceiptNumber(lastReceipt?: string): string {

  const year = new Date().getFullYear();

  if (!lastReceipt) {
    return `DON-${year}-000001`;
  }

  const lastNumber = Number(
    lastReceipt.split("-").pop()
  );

  return `DON-${year}-${String(lastNumber + 1).padStart(6, "0")}`;
}