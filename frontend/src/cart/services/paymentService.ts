async function handleResponse(res: Response) {
  if (res.status === 401) {
    window.location.href = "/login";
    return { success: false, message: "Unauthorized" };
  }
  return res.json();
}

export async function addPayment(payload: any) {
  const res = await fetch("http://localhost:6789/api/payment/add", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function clearCartServer() {
  const res = await fetch("http://localhost:6789/api/cart/clear", {
    method: "POST",
    credentials: "include",
  });
  return handleResponse(res);
}
