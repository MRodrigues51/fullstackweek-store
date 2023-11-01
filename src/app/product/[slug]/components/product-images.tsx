"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  name: string;
  imageUrls: string[];
}

const ProductImages = ({ imageUrls, name }: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);
  const handleImageclick = (imageUrl: string) => {
    setCurrentImage(imageUrl)
  }
  return (
    <div className="flex flex-col">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent">
        <Image
          src={currentImage}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          alt={name}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4 px-5">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[100px] items-center justify-center rounded-lg bg-accent
                        ${
                          imageUrl === currentImage &&
                          "border-2 border-solid border-primary"
                        }
                `}
                onClick={() => handleImageclick(imageUrl)}
          >
            <Image
              src={imageUrl}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
              alt={name}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;