async function handleResponse(res: Response) {
  if (res.status === 401) {
    window.location.href = "/login";
    return { success: false, message: "Unauthorized" };
  }
  return res.json();
}

export async function fetchCart() {
  const res = await fetch("https://api.nourivitamin.com/api/cart/", {
    credentials: "include",
  });
  return handleResponse(res);
}

export async function addToCart(payload: any) {
  const res = await fetch("https://api.nourivitamin.com/api/cart/add", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateCart(payload: any) {
  const res = await fetch("https://api.nourivitamin.com/api/cart/update", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function removeFromCart(id: number) {
  const res = await fetch("https://api.nourivitamin.com/api/cart/remove", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: id }),
  });
  return handleResponse(res);
}

export async function clearCart() {
  const res = await fetch("https://api.nourivitamin.com/api/cart/clear", {
    method: "POST",
    credentials: "include",
  });
  return handleResponse(res);
}
