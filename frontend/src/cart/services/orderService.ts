export async function createOrder(payload: any) {
  const res = await fetch("http://localhost:6789/api/orders/create", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function getOrders() {
  const res = await fetch("http://localhost:6789/api/orders/", {
    credentials: "include",
  });
  return res.json();
}
