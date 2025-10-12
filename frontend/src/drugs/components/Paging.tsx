import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useEffect, useState } from "react";

const Paging = (props: { currentPage: number, totalPages: number, setPage: (page: number) => void }) => {
  const [hasLeftEllipsis, setHasLeftEllipsis] = useState(false);
  const [hasRightEllipsis, setHasRightEllipsis] = useState(false);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (props.totalPages <= 5) {
      setPageNumbers(Array.from({ length: props.totalPages }, (_, index) => index + 1));
    } else if (props.currentPage <= 3) {
      setHasRightEllipsis(true);
      setHasLeftEllipsis(false);
      setPageNumbers(Array.from({ length: 5 }, (_, index) => index + 1));
    } else if (props.currentPage >= props.totalPages - 2) {
      setHasLeftEllipsis(true);
      setHasRightEllipsis(false);
      setPageNumbers(Array.from({ length: 5 }, (_, index) => index + props.totalPages - 4));
    } else {
      setHasLeftEllipsis(true);
      setHasRightEllipsis(true);
      setPageNumbers(Array.from({ length: 5 }, (_, index) => index + props.currentPage - 2));
    }
  }, [props.currentPage, props.totalPages])

  return (
    <div className="flex justify-center items-center pt-8">
      <button className="cursor-pointer disabled:opacity-50 hover:underline px-2" disabled={props.currentPage === 1} onClick={() => props.setPage(1)}><ChevronsLeft /></button>
      <button className="cursor-pointer disabled:opacity-50 hover:underline px-2" disabled={props.currentPage === 1} onClick={() => props.setPage(props.currentPage - 1)}><ChevronLeft /></button>
      {
        hasLeftEllipsis && <span className="px-2">...</span>
      }
      {pageNumbers.map(page => (
        <button key={`page-${page}`} className={`cursor-pointer hover:underline px-2 ${page === props.currentPage ? 'font-bold' : ''}`} onClick={() => props.setPage(page)}>{page}</button>
      ))}
      {
        hasRightEllipsis && <span className="px-2">...</span>
      }
      <button className="cursor-pointer disabled:opacity-50 hover:underline px-2" disabled={props.currentPage === props.totalPages} onClick={() => props.setPage(props.currentPage + 1)}><ChevronRight /></button>
      <button className="cursor-pointer disabled:opacity-50 hover:underline px-2" disabled={props.currentPage === props.totalPages} onClick={() => props.setPage(props.totalPages)}><ChevronsRight /></button>
    </div>
  )
}

export default Paging