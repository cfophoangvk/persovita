export async function addPayment(payload: any) {
  const res = await fetch("http://localhost:6789/api/payment/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function clearCartServer() {
  const res = await fetch("http://localhost:6789/api/cart/clear", {
    method: "POST",
  });
  return res.json();
}
