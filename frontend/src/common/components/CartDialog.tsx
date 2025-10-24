import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { PersistCart } from "../../cart/interfaces/PersistCart";

interface IMenuDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: PersistCart[];
}

const formatVND = (value: number) => {
  return value.toLocaleString("vi-VN") + " VNĐ";
};

const CartDialog = (props: IMenuDialogProps) => {
  return (
    <div className={`fixed inset-0 bg-gray-500/75 z-50 h-screen text-sm 
      transition-opacity duration-300 
      ${props.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white rounded-lg w-screen h-screen py-2 
        transform transition-transform duration-300 ease-out flex flex-col
        ${props.isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between px-5 py-2 border-b border-gray-300">
          <div className="flex-1">
            <div className="mx-auto w-fit font-semibold">XEM TRƯỚC GIỎ HÀNG</div>
          </div>
          <ChevronRight className="text-gray-400 hover:text-gray-600 z-10 cursor-pointer" onClick={() => props.setIsOpen(false)} />
        </div>
        <div className="p-6 flex-1">
          {!props.cartItems || props.cartItems.length === 0 ? (
            <div className="text-center text-sm text-gray-500 py-8">
              <div className="mb-6">
                Bạn chưa có sản phẩm bổ sung nào trong giỏ hàng
              </div>
              <Link
                to="/shop"
                onClick={() => {
                  props.setIsOpen(false);
                }}
                className="inline-block px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:border-teal-500 hover:text-teal-600 transition duration-150"
              >
                Xem danh mục
              </Link>
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {props.cartItems.map((item) => (
                  <li key={item.productId} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center overflow-hidden border border-gray-200">
                      <img
                        src={
                          item.image || "/images/product-placeholder.png"
                        }
                        alt={item.name}
                        className="object-contain w-full h-full p-1"
                      />
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="font-medium text-gray-800 line-clamp-1">
                        {item.name}
                      </div>
                      <div className="text-gray-500 text-xs">
                        SL: {item.quantity || 1}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {formatVND(item.price || 0)}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="font-semibold ml-6">Tóm tắt đơn hàng</div>
        <div className="border-t m-6 mt-1">
          <div className="mt-3 text-gray-700 space-y-1">
            {(() => {
              const v = (props.cartItems || []).reduce(
                (s, a) => s + (a.price || 0) * (a.quantity || 1),
                0
              );
              const shippingVND = v > 0 ? 30000 : 0;
              const totalVND = v + shippingVND;

              return (
                <>
                  <div className="flex justify-between">
                    <span>Giá trị sản phẩm</span>
                    <span>{formatVND(v)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Giảm giá</span>
                    <span>{formatVND(0)}</span>
                  </div>

                  {props.cartItems && props.cartItems.length > 0 && (
                    <div className="flex justify-between">
                      <span>Vận chuyển</span>
                      <span>{formatVND(shippingVND)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200 text-base text-gray-900">
                    <span>TỔNG CỘNG</span>
                    <span>{formatVND(totalVND)}</span>
                  </div>
                </>
              );
            })()}
          </div>
          <div className="mt-3 text-gray-500 bg-teal-50 p-3 rounded text-center">
            Việc áp dụng mã khuyến mãi và quản lý tùy chọn mua hàng được
            thực hiện ở bước tiếp theo
          </div>

          <div className="mt-4">
            <Link
              to="/cart"
              className="block w-full text-center py-2 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-600 transition duration-150"
            >
              Đi đến giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDialog