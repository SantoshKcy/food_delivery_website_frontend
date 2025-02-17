import React from "react";

const RestaurantCard = ({ name, location, rating, reviews, imageUrl }) => {
    return (
        <div className="rounded-2xl shadow-lg bg-white overflow-hidden w-72">
            {/* Image Section */}
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-40 object-cover"
            />

            {/* Content Section */}
            <div className="p-4">
                {/* Restaurant Name */}
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {name}
                </h2>

                {/* Location */}
                <p className="text-sm text-gray-500 mt-1 truncate">{location}</p>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-between mt-3">
                    {/* Rating */}
                    <div className="flex items-center gap-2 bg-green-100 text-green-600 text-sm font-semibold px-2 py-1 rounded-lg">
                        <span>{rating}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.812.812 0 011.04 0l2.144 1.94c.186.169.45.242.711.187l2.84-.561c.623-.123 1.12.473.908 1.06l-1.243 3.594c-.09.261-.024.555.174.74l2.408 2.177c.505.456.23 1.314-.457 1.406l-3.758.475a.75.75 0 00-.564.384l-1.604 3.228c-.312.628-1.258.628-1.57 0l-1.604-3.228a.75.75 0 00-.564-.384l-3.758-.475c-.687-.092-.962-.95-.457-1.406l2.408-2.177c.198-.185.265-.48.174-.74L4.768 6.125c-.212-.587.285-1.183.908-1.06l2.84.561c.261.055.525-.018.71-.187l2.144-1.94z"
                            />
                        </svg>
                    </div>

                    {/* Reviews */}
                    <p className="text-sm text-gray-500">({reviews})</p>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;

