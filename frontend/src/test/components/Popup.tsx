import { Minus, Plus, X } from 'lucide-react';
import React, { useState, type JSX } from 'react';
import DOMPurify from "dompurify";
import type { Product } from '../interfaces/Product';

interface AccordionItemProps {
  title: string;
  content: string | JSX.Element;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-2 text-left font-semibold text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <Minus size={13} /> : <Plus size={13} />}
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600">
          {typeof content === 'string' ? <p>{content}</p> : content}
        </div>
      )}
    </div>
  );
};

const Popup = (props: { isOpen: boolean, setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>, product: Product | undefined }) => {
  const product = props.product;
  if (!product) {
    return <div className={`fixed inset-0 bg-gray-500/75 z-50 h-screen text-sm transition-all ${props.isOpen ? '' : 'hidden'}`}>
      <div className="relative bg-white w-1/2 transition-all h-full flex flex-col md:flex-row overflow-hidden">
        <X className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 cursor-pointer" onClick={() => props.setIsPopupOpen(false)} />
        <div className='text-center'>No Data</div>
      </div>
    </div>
  }

  const descriptionElement = <div className="text-sm text-gray-700">
    {product.description}
  </div>

  const compositionElement = <>
    <div className="text-sm text-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Thành phần chính</th>
            <th className="p-2 text-right">Trong 1 viên nang</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(product.activeIngredients) &&
            product.activeIngredients.length ? (
            product.activeIngredients.map((ing: any, i: number) => (
              <tr key={i}>
                <td className="p-2">{ing.name}</td>
                <td className="p-2 text-right">{ing.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="p-2 text-center">
                Không xác định
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {
      product.additiveIngredients && (
        <div
          className="text-sm text-gray-700 mt-4"
          // sanitize trước khi inject để tránh XSS
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              product.additiveIngredients || "Not specified"
            ),
          }}
        />
      )
    }
  </>

  const usageElement =
    <div
      className="text-sm text-gray-700"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(
          product.usage || "Not specified"
        ),
      }}
    />

  const contraindicationElement = <div
    className="text-sm text-gray-700"
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(
        product.contraindication || "Not specified"
      ),
    }}
  />

  return (
    <div className={`fixed inset-0 bg-gray-500/75 z-50 h-screen text-sm transition-all ${props.isOpen ? '' : 'hidden'}`}>
      <div className="relative bg-white w-1/2 transition-all h-full flex flex-col md:flex-row overflow-hidden">
        <X className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 cursor-pointer" onClick={() => props.setIsPopupOpen(false)} />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-center relative py-10">
            <img
              src={product.image}
              alt={product.name}
              className="h-16 w-16 object-contain mr-4"
            />
            <h2 className="absolute left-4 bottom-4 font-bold text-gray-800">{product.name}</h2>
          </div>

          <div className="p-4">
            <div className="text-2xl font-extrabold">
              {product.price
                ? `${product.price.toLocaleString()} VND`
                : "Contact"}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Số viên: <b>{product.amount ?? 60} viên</b>
            </div>
          </div>


          <div className="space-y-0 p-4">
            <AccordionItem title="MÔ TẢ" content={descriptionElement} />
            <AccordionItem title="THÀNH PHẦN" content={compositionElement} />
            <AccordionItem title="CÔNG DỤNG" content={usageElement} />
            <AccordionItem title="CHỐNG CHỈ ĐỊNH" content={contraindicationElement} />
          </div>

          <div className='text-center underline text-gray-500 cursor-pointer'>
            <span className='mx-auto' onClick={() => {
              window.scrollTo(0, 0);
              props.setIsPopupOpen(false);
              location.href = `/products/${product.id}`;
            }}>Tìm hiểu thêm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;