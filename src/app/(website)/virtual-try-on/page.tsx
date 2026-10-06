
"use client";

import { useRef, useState, type ChangeEvent } from "react";
import {
  Upload,
  X,
  Shirt,
  Sparkles,
  ImagePlus,
  Check,
  ZoomIn,
  RotateCcw,
  PackageSearch,
  Heart,
} from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  color: string;
  emoji: string;
}

const categories = [
  "All",
  "Shirts",
  "T-shirts",
  "Pants",
  "Dresses",
  "Shoes",
  "Caps",
  "Watches",
];

const products: Product[] = [
  {
    id: "1",
    name: "Classic Blue Shirt",
    category: "Shirts",
    price: 1250,
    color: "bg-blue-100",
    emoji: "👔",
  },
  {
    id: "2",
    name: "White Formal Shirt",
    category: "Shirts",
    price: 1350,
    color: "bg-slate-100",
    emoji: "👔",
  },
  {
    id: "3",
    name: "Black Casual Shirt",
    category: "Shirts",
    price: 1200,
    color: "bg-gray-200",
    emoji: "👔",
  },
  {
    id: "4",
    name: "Basic White T-shirt",
    category: "T-shirts",
    price: 750,
    color: "bg-stone-100",
    emoji: "👕",
  },
  {
    id: "5",
    name: "Navy Blue T-shirt",
    category: "T-shirts",
    price: 850,
    color: "bg-blue-100",
    emoji: "👕",
  },
  {
    id: "6",
    name: "Slim Fit Jeans",
    category: "Pants",
    price: 1850,
    color: "bg-indigo-100",
    emoji: "👖",
  },
  {
    id: "7",
    name: "Casual Dress",
    category: "Dresses",
    price: 2200,
    color: "bg-rose-100",
    emoji: "👗",
  },
  {
    id: "8",
    name: "Classic Sneakers",
    category: "Shoes",
    price: 1950,
    color: "bg-gray-100",
    emoji: "👟",
  },
];

export default function VirtualTryOnPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [zoom, setZoom] = useState(false);
  const [notice, setNotice] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null> (null);
  

  const filteredProducts =
    category === "All"
      ? products
      : products.filter(
          (product) => product.category === category
        );

  const handlePhotoUpload = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/webp"].includes(
        file.type
      )
    ) {
      setNotice("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setNotice("Image size must be less than 5 MB.");
      return;
    }

    if (photo) URL.revokeObjectURL(photo);

    setUploadFile(file)
    const imageUrl = URL.createObjectURL(file);
    setPhoto(imageUrl);
    setSelectedProduct(null);
    setNotice("");
  };

  const removePhoto = () => {
    if (photo) URL.revokeObjectURL(photo);
    setPhoto(null);
    setSelectedProduct(null);
    setNotice("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleGenerate = () => {
    
    if (!photo || !selectedProduct) {
      setNotice(
        "Upload a photo and select a product first."
      );
      return;
    }

   

    setNotice(
      "AI integration will be connected in the next phase."
    );
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <Shirt size={22} className="text-[#0F766E]" />

              <p className="font-['Poppins'] text-base font-semibold uppercase tracking-wider text-[#0F766E]">
                AI Shopping Experience
              </p>
            </div>

            <h1 className="mt-3 font-['Poppins'] text-3xl font-bold text-[#1E293B] sm:text-4xl">
              Virtual Try-On
            </h1>

            <p className="mt-3 max-w-2xl font-['Poppins'] text-base leading-7 text-[#64748B]">
              Upload your photo and explore how different
              products might look on you.
            </p>
          </div>

          
        </div>

        {/* Main Workspace */}
        <div className="mt-9 grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Photo Preview */}
          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-['Poppins'] text-xl font-semibold text-[#1E293B]">
                Your Photo
              </h2>

              {photo && (
                <button
                  type="button"
                  onClick={removePhoto}
                  aria-label="Remove photo"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-[#FEE2E2] hover:text-red-500"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="relative mt-5 flex min-h-[380px] items-center justify-center overflow-hidden rounded-lg border border-[#E8EEEE] bg-[#F6FAF9] sm:min-h-[480px]">
              {photo ? (
                <>
                  <Image
                    height={512}
                    width={512}
                    src={photo}
                    alt="Uploaded full-body photo"
                    className={`h-full max-h-[480px] w-full object-contain transition-transform duration-300 ${
                      zoom ? "scale-125" : "scale-100"
                      
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setZoom((current) => !current)}
                    aria-label="Toggle zoom"
                    className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-lg border border-[#E8EEEE] bg-white text-[#0F766E] shadow-sm transition hover:bg-[#E8F5F3]"
                  >
                    <ZoomIn size={21} />
                  </button>
                </>
              ) : (
                <div className="flex w-full flex-col items-center px-5 py-14 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F5F3]">
                    <ImagePlus
                      size={38}
                      className="text-[#0F766E]"
                    />
                  </div>

                  <h3 className="mt-6 font-['Poppins'] text-xl font-semibold text-[#1E293B]">
                    Upload your full-body photo
                  </h3>

                  <p className="mt-3 max-w-sm font-['Poppins'] text-base leading-7 text-[#64748B]">
                    Use a clear, front-facing photo where
                    your body is visible.
                  </p>

                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-6 py-3.5 font-['Poppins'] text-base font-medium text-white transition hover:bg-[#0B625B]"
                  >
                    <Upload size={19} />
                    Upload Photo
                  </button>

                  <p className="mt-4 font-['Poppins'] text-sm text-[#94A3B8]">
                    JPG, PNG or WebP · Maximum 5 MB
                  </p>
                </div>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            {photo && (
              <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-base text-[#0F766E]">
                  <Check size={19} />
                  <span className="font-['Poppins'] font-medium">
                    Photo uploaded
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E8EEEE] px-5 py-2.5 font-['Poppins'] text-base font-medium text-[#334155] transition hover:border-[#0F766E] hover:text-[#0F766E]"
                >
                  <RotateCcw size={18} />
                  Change Photo
                </button>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="mt-6 flex items-start gap-3 rounded-lg bg-[#E8F5F3] p-4">
              <div className="mt-0.5 text-[#0F766E]">
                <Check size={21} />
              </div>

              <div>
                <p className="font-['Poppins'] text-base font-semibold text-[#1E293B]">
                  Your photo stays private
                </p>

                <p className="mt-1 font-['Poppins'] text-sm leading-6 text-[#64748B]">
                  In this initial version, your image stays
                  in your browser. AI processing is not
                  connected yet.
                </p>
              </div>
            </div>
          </div>

          {/* Product Selection */}
          <div className="rounded-xl border border-[#E8EEEE] bg-white p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <h2 className="font-['Poppins'] text-xl font-semibold text-[#1E293B]">
                Choose Your Style
              </h2>

              <span className="font-['Poppins'] text-sm text-[#64748B]">
                {filteredProducts.length} products
              </span>
            </div>

            {/* Category Filters */}
            <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-lg px-4 py-2.5 font-['Poppins'] text-sm font-medium transition ${
                    category === item
                      ? "bg-[#0F766E] text-white"
                      : "border border-[#E8EEEE] bg-white text-[#64748B] hover:border-[#0F766E] hover:text-[#0F766E]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {filteredProducts.map((product) => {
                const isSelected =
                  selectedProduct?.id === product.id;

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      setSelectedProduct(product);
                      setNotice("");
                    }}
                    className={`group relative overflow-hidden rounded-xl border bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(15,118,110,0.08)] ${
                      isSelected
                        ? "border-[#0F766E] ring-1 ring-[#0F766E]"
                        : "border-[#E8EEEE] hover:border-[#D3E7E4]"
                    }`}
                  >
                    <div
                      className={`relative flex h-36 items-center justify-center ${product.color} sm:h-44`}
                    >
                      <span className="text-7xl transition-transform duration-300 group-hover:scale-110">
                        {product.emoji}
                      </span>

                      {isSelected && (
                        <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#0F766E] text-white">
                          <Check size={17} />
                        </span>
                      )}

                      <span className="absolute left-2 top-2 rounded-full bg-white/90 p-2 text-[#64748B]">
                        <Heart size={17} />
                      </span>
                    </div>

                    <div className="p-3.5">
                      <h3 className="line-clamp-2 min-h-12 font-['Poppins'] text-base font-medium leading-6 text-[#1E293B]">
                        {product.name}
                      </h3>

                      <p className="mt-2 font-['Poppins'] text-lg font-bold text-[#0F766E]">
                        ৳{product.price.toLocaleString("en-BD")}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Product */}
            {selectedProduct && (
              <div className="mt-6 flex items-center gap-4 rounded-lg border border-[#D3E7E4] bg-[#F6FAF9] p-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg ${selectedProduct.color}`}
                >
                  <span className="text-4xl">
                    {selectedProduct.emoji}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-['Poppins'] text-sm text-[#64748B]">
                    Selected Product
                  </p>

                  <p className="mt-1 truncate font-['Poppins'] text-base font-semibold text-[#1E293B]">
                    {selectedProduct.name}
                  </p>

                  <p className="mt-1 font-['Poppins'] text-lg font-bold text-[#0F766E]">
                    ৳{selectedProduct.price.toLocaleString("en-BD")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  aria-label="Clear selected product"
                  className="rounded-lg p-2 text-[#64748B] transition hover:bg-white hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* Generate Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!photo || !selectedProduct}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-5 py-4 font-['Poppins'] text-base font-semibold text-white transition hover:bg-[#0B625B] disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
            >
              <Sparkles size={20} />
              Generate Try-On
            </button>

            {notice && (
              <p
                role="status"
                className="mt-4 rounded-lg border border-[#E8EEEE] bg-[#F8FAFC] px-4 py-3 text-center font-['Poppins'] text-sm leading-6 text-[#64748B]"
              >
                {notice}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Information */}
        <div className="mt-8 rounded-xl border border-[#E8EEEE] bg-white p-6 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E8F5F3] text-[#0F766E]">
                <Sparkles size={23} />
              </div>

              <div>
                <h3 className="font-['Poppins'] text-lg font-semibold text-[#1E293B]">
                  See how products might look on you
                </h3>

                <p className="mt-2 max-w-xl font-['Poppins'] text-base leading-7 text-[#64748B]">
                  This is the initial UI version. The
                  generated try-on preview, zoomed result
                  and download features will be connected
                  after AI integration.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <PackageSearch size={18} />
              <span className="font-['Poppins']">
                Preview mode
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}