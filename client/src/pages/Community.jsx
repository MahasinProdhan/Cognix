import React, { useEffect, useState } from "react";
import { dummyPublishedImages } from "../assets/assets";
import Loading from "./Loading";

const Community = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setImages(dummyPublishedImages);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-full h-full p-6 pt-12 mx-auto overflow-y-scroll xl:px-12 2xl:px-20">
      <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-purple-100">
        Community Images
      </h2>

      {images.length > 0 ? (
        <div className="flex flex-wrap gap-5 max-sm:justify-center">
          {images.map((item, index) => (
            <a
              key={index}
              href={item.imageUrl}
              target="_blank"
              className="relative block overflow-hidden transition-shadow duration-300 border border-gray-200 rounded-lg shadow-sm group dark:border-purple-700 hover:shadow-md"
            >
              <img
                src={item.imageUrl}
                className="w-full h-40 transition-transform duration-300 ease-in-out md:h-50 2xl:h-62 objet-cover group-hover:scale-105"
              />
              <p className="absolute bottom-0 right-0 px-4 py-1 text-xs text-white transition-all duration-300 opacity-0 bg-black/50 backdrop-blur rounded-tl-xl group-hover:opacity-100">
                Created by {item.userName}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-gray-600 dark:text-purple-200">
          No images available
        </p>
      )}
    </div>
  );
};

export default Community;
