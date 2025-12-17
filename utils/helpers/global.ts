export function generateTrxNo(seq: number) {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  const date = `${yyyy}${mm}${dd}`;

  const maxId = seq;
  const sequence = String(maxId + 1).padStart(4, "0");

  return `TRX-BRC-${date}-${sequence}`;
}
