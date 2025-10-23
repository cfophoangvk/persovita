import type { AxiosResponse } from "axios";
import axiosInstance from "../../utils/axios";

async function handleResponse(res: AxiosResponse) {
  if (res.status === 401) {
    return { success: false, status: 401, message: "Unauthorized" } as any;
  }
  return res.data;
}

export async function fetchCart() {
  const res = await axiosInstance.get("cart");
  return handleResponse(res);
}

// smart fetch: if server returns 401 (not logged), return cart from localStorage
export async function fetchCartSmart() {
  try {
    const res = await axiosInstance.get("cart", {
      withCredentials: true
    });
    if (res.status === 401) {
      const persist = localStorage.getItem("persistCart") || "[]";
      const cart = JSON.parse(persist || "[]");
      return { success: true, cart } as any;
    }
    return handleResponse(res);
  } catch (e) {
    // fallback to local
    console.log("Giỏ hàng chưa có vì sao? Vì bạn chưa đăng nhập! Đang lấy giỏ hàng từ localStorage");
    const persist = localStorage.getItem("persistCart") || "[]";
    const cart = JSON.parse(persist || "[]");
    return { success: true, cart } as any;
  }
}

export async function addToCart(payload: any) {
  try {
    const res = await axiosInstance.post("cart/add", payload, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" }
    })
    if (res.status === 401) {
      // not logged in -> save to localStorage
      try {
        const key = "persistCart";
        const raw = localStorage.getItem(key) || "[]";
        const list = JSON.parse(raw || "[]");
        // merge by productId
        const existing = list.find(
          (i: any) => i.productId === payload.productId
        );
        if (existing) {
          existing.quantity =
            (Number(existing.quantity) || 0) + (Number(payload.quantity) || 1);
          existing.subscription = payload.subscription ?? existing.subscription;
          existing.subscriptionMonths =
            payload.subscriptionMonths ?? existing.subscriptionMonths ?? 0;
        } else {
          list.push({
            userId: null,
            productId: payload.productId,
            name: payload.name,
            price: payload.price,
            quantity: Number(payload.quantity) || 1,
            subscription: payload.subscription || false,
            subscriptionMonths: payload.subscriptionMonths || 0,
            image: payload.image || "",
          });
        }
        localStorage.setItem(key, JSON.stringify(list));
        return { success: true, local: true, cart: list } as any;
      } catch (err) {
        return { success: false, message: "Failed to save local cart" } as any;
      }
    }
    return handleResponse(res);
  } catch (err) {
    // network error -> fallback to local storage
    const key = "persistCart";
    const raw = localStorage.getItem(key) || "[]";
    const list = JSON.parse(raw || "[]");
    const existing = list.find((i: any) => i.productId === payload.productId);
    if (existing) {
      existing.quantity =
        (Number(existing.quantity) || 0) + (Number(payload.quantity) || 1);
    } else {
      list.push({
        userId: null,
        productId: payload.productId,
        name: payload.name,
        price: payload.price,
        quantity: Number(payload.quantity) || 1,
        subscription: payload.subscription || false,
        subscriptionMonths: payload.subscriptionMonths || 0,
        image: payload.image || "",
      });
    }
    localStorage.setItem(key, JSON.stringify(list));
    return { success: true, local: true, cart: list } as any;
  }
}

// sync localStorage cart to server after login
export async function syncLocalCartToServer() {
  const key = "persistCart";
  const raw = localStorage.getItem(key) || "[]";
  const list: any[] = JSON.parse(raw || "[]");
  if (!list || list.length === 0) return { success: true, synced: 0 };

  let synced = 0;
  for (const item of list) {
    try {
      // map fields to payload expected by server
      const payload = {
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image || "",
        subscription: item.subscription || false,
        subscriptionMonths: item.subscriptionMonths || 0,
      };
      const res = await axiosInstance.post("cart/add", payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      })
      if (res.status === 200 || res.status === 201) {
        synced++;
      }
    } catch (e) {
      // ignore individual failures
    }
  }
  // clear local cart after attempting sync
  localStorage.removeItem(key);
  // notify other parts of app
  window.dispatchEvent(new CustomEvent("cart:updated"));
  return { success: true, synced } as any;
}

export async function updateCart(payload: any) {
  const res = await axiosInstance.post("cart/update", payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
  });
  return handleResponse(res);
}

export async function removeFromCart(id: number) {
  const res = await axiosInstance.post("cart/remove", { productId: id }, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
  });
  return handleResponse(res);
}

export async function clearCart() {
  const res = await axiosInstance.post("cart/clear", {}, {
    withCredentials: true
  });
  return handleResponse(res);
}
