export async function fetchCart() {
  const res = await fetch("http://localhost:6789/api/cart/");
  return res.json();
}

export async function addToCart(payload: any) {
  const res = await fetch("http://localhost:6789/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateCart(payload: any) {
  const res = await fetch("http://localhost:6789/api/cart/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function removeFromCart(id: number) {
  const res = await fetch("http://localhost:6789/api/cart/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

export async function clearCart() {
  const res = await fetch("http://localhost:6789/api/cart/clear", {
    method: "POST",
  });
  return res.json();
}
