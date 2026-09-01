import Image from "next/image";
import { Heart } from "lucide-react";
import { getPopularProducts } from "@/lib/api/homepage/popularProducts";
import { PopularProduct } from "@/type/homePage";
import Link from "next/link";



const PopularProducts = async () => {
  const products: PopularProduct[] = await getPopularProducts();

  return (
    <section className="bg-white px-4 py-15 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-['Poppins'] text-lg font-semibold tracking-tight text-[#1E293B] md:text-2xl">
            Popular Products
          </h2>

          <button
            type="button"
            className="group flex items-center gap-1.5 font-['Poppins'] text-xs font-medium text-[#0F766E] transition-colors duration-300 hover:text-[#FF6B6B] sm:text-sm"
          >
            View All Products

            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Product Slider */}
        <div className="relative">

      
          {/* Products */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {products.map((product) => {
              const price =
                product.salePrice && product.salePrice > 0
                  ? product.salePrice
                  : product.regularPrice;

              return (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-xl border border-[#E8EEEE] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#CFE7E4] hover:shadow-[0_8px_25px_rgba(15,118,110,0.10)]"
                >

                  {/* Wishlist */}
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to wishlist`}
                    className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#94A3B8] transition-all duration-300 hover:text-[#FF6B6B]"
                  >
                    <Heart size={14} strokeWidth={1.8} />
                  </button>

                  {/* Image */}
                  <div className="relative flex h-32 items-center justify-center overflow-hidden bg-[#F6FAF9] sm:h-36">

                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={220}
                        height={220}
                        className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="font-['Poppins'] text-xs text-[#94A3B8]">
                        No Image
                      </div>
                    )}

                  </div>

                  {/* Product Information */}
                  <div className="px-3 pb-3 pt-2.5">

                    <h3 className="truncate font-['Poppins'] text-[14px] font-semibold text-[#1E293B] md:text-[16px]">
                      {product.name}
                    </h3>

                    <p className="mt-0.5 truncate font-['Poppins'] text-[12px] text-[#94A3B8] sm:text-[9px]">
                      {product.shortDescription || product.category}
                    </p>

                    <p className="mt-1 truncate font-['Poppins'] text-[11px] text-[#0F766E]">
                      {product.category}
                    </p>

                    {/* Stock */}
                    <div className="mt-1">
                      <span
                        className={`font-['Poppins'] text-[11px] ${
                          product.stockQuantity > 0
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {product.stockQuantity > 0
                          ? `${product.stockQuantity} in stock`
                          : "Out of stock"}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-1 flex items-center gap-2">

                      <span className="font-['Poppins'] text-xs font-bold text-[#1E293B]">
                        ${price.toFixed(2)}
                      </span>

                      {product.salePrice &&
                        product.salePrice > 0 &&
                        product.salePrice < product.regularPrice && (
                          <span className="font-['Poppins'] text-[10px] text-[#94A3B8] line-through">
                            ${product.regularPrice.toFixed(2)}
                          </span>
                        )}

                    </div>

                    {/* Add To Cart */}
                    <Link
                      href={`/products/${product.id}`}
                      className="mt-2.5 flex w-full items-center justify-center rounded-md bg-[#0F766E] py-1.5 font-['Poppins'] text-[12px] font-medium text-white transition-all duration-300 hover:bg-[#0B625B] md:text-[16px]"
                    >
                      Add to Cart
                    </Link>


                  </div>
                </div>
              );
            })}

          </div>


        </div>
      </div>
    </section>
  );
};

export default PopularProducts;