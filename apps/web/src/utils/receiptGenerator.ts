import api from "../services/api";

/**
 * Trigger download of donation receipt PDF from the API
 */
export async function downloadReceiptPdf(
  donationId: string,
  receiptNo?: string
): Promise<void> {
  const response = await api.get(`/receipts/download/${donationId}`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `Receipt-${receiptNo || donationId}.pdf`
  );
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

/**
 * Get direct preview URL for a donation receipt PDF
 */
export function getReceiptPreviewUrl(donationId: string): string {
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
  return `${baseURL}/receipts/${donationId}`;
}
