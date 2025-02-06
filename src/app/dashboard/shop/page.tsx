"use client";
import React from 'react';
import { FaSearch, FaShoppingCart, FaStar, FaFilter } from 'react-icons/fa';

export default function Shop() {
  // This would typically come from an API
  const products = [
    {
      id: 1,
      name: "Premium Camping Tent",
      price: "$299",
      rating: 4.5,
      reviews: 28,
      image: "/images/cardImage.jpg",
      category: "Tents",
    },
    {
      id: 2,
      name: "Hiking Backpack Pro",
      price: "$129",
      rating: 4.8,
      reviews: 45,
      image: "/images/cardImage.jpg",
      category: "Bags",
    },
    {
      id: 3,
      name: "LED Camping Lantern",
      price: "$39",
      rating: 4.3,
      reviews: 32,
      image: "/images/cardImage.jpg",
      category: "Equipment",
    },
    {
      id: 4,
      name: "Sleeping Bag Ultra",
      price: "$149",
      rating: 4.7,
      reviews: 56,
      image: "/images/cardImage.jpg",
      category: "Sleeping Gear",
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Camping Shop</h1>
          <p className="text-gray-600">Find the best camping gear for your next adventure</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaShoppingCart className="text-gray-600 text-xl" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaFilter />
                Filters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Category</label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option value="">All Categories</option>
                    <option value="tents">Tents</option>
                    <option value="bags">Bags</option>
                    <option value="equipment">Equipment</option>
                    <option value="sleeping">Sleeping Gear</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Price Range</label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option value="">All Prices</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="51-100">$51 - $100</option>
                    <option value="101-200">$101 - $200</option>
                    <option value="201+">$201+</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Rating</label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option value="">All Ratings</option>
                    <option value="4+">4+ Stars</option>
                    <option value="3+">3+ Stars</option>
                    <option value="2+">2+ Stars</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          {/* Products */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full">
                    {product.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center text-yellow-400">
                      <FaStar />
                      <span className="ml-1 text-gray-600">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 