import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Paging from './Paging';
import { ProductService } from '../services/ProductService';
import type { IProductReview } from '../interfaces/IProductReview';

const ProductReviews = (props: { productId: number }) => {
  const [page, setPage] = useState<number>(1);
  const [allReviews, setAllReviews] = useState<IProductReview[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pagingReviews, setPagingReviews] = useState<IProductReview[]>([]);
  const productService = new ProductService();

  useEffect(() => {
    productService.getProductReviewById(props.productId)
      .then(data => {
        setAllReviews(data);
      });
  }, []);

  useEffect(() => {
    setTotalPages(allReviews.length > 0 ? Math.ceil(allReviews.length / 5) : 1);
    if (page < 1) {
      setPage(1);
    } else if (page > totalPages) {
      setPage(totalPages);
    }

    setPagingReviews(allReviews.slice(5 * (page - 1), 5 * page));
  }, [allReviews, page])

  const ratingDistribution = [
    { stars: 5, percentage: 58 },
    { stars: 4, percentage: 26 },
    { stars: 3, percentage: 12 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 2 },
  ];

  const parseDateToVietnameseString = (date: string): string => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()} tháng ${dateObj.getMonth()}, ${dateObj.getFullYear()}`
  }

  return (
    <div className="min-h-screen bg-stone-200/50 mt-10 p-8 text-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 pr-0 lg:pr-12 mb-8 lg:mb-0">
          <h1 className="md:text-4xl text-2xl mb-4 text-gray-900">Đánh giá về <b>sản phẩm này</b></h1>
          <div className="flex items-center mb-4">
            <span className="text-5xl font-bold mr-2 text-gray-900">4,4</span>
            <StarRating rating={4.4} />
          </div>
          <p className="text-gray-600 mb-8 md:text-base text-sm">
            Số lượt đánh giá trung bình là 4.4/5 sao. <br />Chúng tôi đã thu thập được 2040 bài đánh giá.
          </p>

          <div className="space-y-3">
            {ratingDistribution.map((dist) => (
              <div key={dist.stars} className="flex items-center">
                <div className="flex w-16 text-lg mr-5">
                  <StarRating rating={dist.stars} />
                </div>
                <div className="flex-grow bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-700 h-2 rounded-full"
                    style={{ width: `${dist.percentage}%` }}
                  ></div>
                </div>
                <span className="ml-4 w-10 text-right text-gray-700">{dist.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          {pagingReviews.map((review, index) => (
            <div key={index} className="py-8 border-b-2 border-gray-500 first:border-t-2 last:border-b-0 flex lg:flex-row flex-col lg:justify-between ">
              <div className='lg:w-1/3 w-auto'>
                <p className="text-lg font-semibold text-gray-900">{review.reviewBy}</p>
                <p className="text-sm text-gray-500 mb-4">{parseDateToVietnameseString(review.reviewDate)}</p>
              </div>
              <div className='lg:w-2/3 w-auto'>
                <StarRating rating={review.stars} />
                <p className="text-gray-700 leading-relaxed mt-3 md:text-base text-sm">{review.description}</p>
              </div>
            </div>
          ))}

          {allReviews.length !== 0 ? <Paging totalPages={totalPages} currentPage={page} setPage={setPage} /> : <div className='text-center'>Không có bài đánh giá nào!</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;