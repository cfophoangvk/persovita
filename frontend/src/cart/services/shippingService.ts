async function handleResponse(res: Response) {
  if (res.status === 401) {
    window.location.href = "/login";
    return { success: false, message: "Unauthorized" };
  }
  return res.json();
}

export async function addShipping(payload: any) {
  const res = await fetch("https://api.nourivitamin.com/api/shipping/add", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function getShipping() {
  const res = await fetch("https://api.nourivitamin.com/api/shipping/", {
    credentials: "include",
  });
  return handleResponse(res);
}
