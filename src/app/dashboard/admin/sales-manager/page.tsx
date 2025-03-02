"use client";
import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaStar, FaRupeeSign, FaPlus, FaTimes, FaChevronDown, FaEdit, FaTrash, FaTag, FaBox, FaLayerGroup } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  discountedPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  description: string;
  features: string[];
  type: 'gear' | 'daily';
}

interface Category {
  id: number;
  name: string;
  type: 'gear' | 'daily';
  icon?: string;
  description?: string;
}

// Mock data for adventure gear products
const gearProducts: Product[] = [
  {
    id: 1,
    name: "Pro Camping Tent 4-Person",
    category: "Camping",
    subCategory: "Tents",
    price: 15999,
    discountedPrice: 12999,
    rating: 4.5,
    reviews: 128,
    stock: 15,
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=600",
    description: "Spacious 4-person tent with weather-resistant materials and easy setup.",
    features: ["Waterproof", "UV Protection", "Easy Setup", "Ventilation Windows"],
    type: 'gear'
  },
  {
    id: 2,
    name: "Mountain Climber Pro Harness",
    category: "Climbing",
    subCategory: "Safety Gear",
    price: 4999,
    rating: 5.0,
    reviews: 89,
    stock: 20,
    image: "https://images.unsplash.com/photo-1602156294246-c49a5e7c8fe2?w=600",
    description: "Professional-grade climbing harness with reinforced stitching.",
    features: ["Adjustable Fit", "Padded Comfort", "Safety Certified", "Durable"],
    type: 'gear'
  },
  {
    id: 3,
    name: "Trekking Backpack 65L",
    category: "Hiking",
    subCategory: "Bags",
    price: 8999,
    discountedPrice: 7499,
    rating: 4.8,
    reviews: 256,
    stock: 8,
    image: "https://images.unsplash.com/photo-1622260614153-03223fb60154?w=600",
    description: "Large capacity backpack perfect for multi-day treks.",
    features: ["Water Resistant", "Multiple Compartments", "Ergonomic Design", "Rain Cover"],
    type: 'gear'
  },
  {
    id: 4,
    name: "Adventure First Aid Kit",
    category: "Safety",
    subCategory: "Medical",
    price: 1999,
    rating: 4.7,
    reviews: 312,
    stock: 45,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600",
    description: "Comprehensive first aid kit for outdoor adventures.",
    features: ["Waterproof Case", "Emergency Guide", "Essential Supplies", "Compact"],
    type: 'gear'
  }
];

// Mock data for daily needs products
const dailyProducts: Product[] = [
  {
    id: 101,
    name: "Energy Trail Mix",
    category: "Food",
    subCategory: "Snacks",
    price: 299,
    discountedPrice: 249,
    rating: 4.8,
    reviews: 156,
    stock: 100,
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600",
    description: "Nutritious mix of nuts, dried fruits, and seeds for energy on the go.",
    features: ["High Energy", "Natural", "No Preservatives"],
    type: 'daily'
  },
  {
    id: 102,
    name: "Camping Coffee Kit",
    category: "Food",
    subCategory: "Beverages",
    price: 899,
    rating: 4.6,
    reviews: 89,
    stock: 25,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    description: "Portable coffee making kit for outdoor enthusiasts.",
    features: ["Compact", "Easy to Clean", "Complete Set"],
    type: 'daily'
  }
];

const allProducts = [...gearProducts, ...dailyProducts];

const gearCategories = [
  { name: "All", count: gearProducts.length },
  { name: "Camping", count: gearProducts.filter(p => p.category === "Camping").length },
  { name: "Climbing", count: gearProducts.filter(p => p.category === "Climbing").length },
  { name: "Hiking", count: gearProducts.filter(p => p.category === "Hiking").length },
  { name: "Safety", count: gearProducts.filter(p => p.category === "Safety").length }
];

const dailyCategories = [
  { name: "All", count: dailyProducts.length },
  { name: "Food", count: dailyProducts.filter(p => p.category === "Food").length },
  { name: "Grocery", count: dailyProducts.filter(p => p.category === "Grocery").length },
  { name: "Handmade Craft", count: dailyProducts.filter(p => p.category === "Handmade Craft").length },
  { name: "Medicinal Plants", count: dailyProducts.filter(p => p.category === "Medicinal Plants").length }
];

// Add categories data
const categoryData: Category[] = [
  { id: 1, name: "Camping", type: 'gear', description: "All camping related equipment and gear" },
  { id: 2, name: "Climbing", type: 'gear', description: "Professional climbing gear" },
  { id: 3, name: "Hiking", type: 'gear', description: "Essential hiking equipment" },
  { id: 4, name: "Safety", type: 'gear', description: "Safety and protection gear" },
  { id: 5, name: "Food", type: 'daily', description: "Fresh and packaged food items" },
  { id: 6, name: "Grocery", type: 'daily', description: "Daily grocery items" },
  { id: 7, name: "Handmade Craft", type: 'daily', description: "Local handmade products" },
  { id: 8, name: "Medicinal Plants", type: 'daily', description: "Traditional medicinal plants" }
];

const OnlineShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'gear' | 'daily'>('gear');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    type: 'gear',
    features: []
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    type: 'gear'
  });
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Camping", type: 'gear', description: "All camping related equipment and gear" },
    { id: 2, name: "Climbing", type: 'gear', description: "Professional climbing gear" },
    { id: 3, name: "Hiking", type: 'gear', description: "Essential hiking equipment" },
    { id: 4, name: "Safety", type: 'gear', description: "Safety and protection gear" },
    { id: 5, name: "Food", type: 'daily', description: "Fresh and packaged food items" },
    { id: 6, name: "Grocery", type: 'daily', description: "Daily grocery items" },
    { id: 7, name: "Handmade Craft", type: 'daily', description: "Local handmade products" },
    { id: 8, name: "Medicinal Plants", type: 'daily', description: "Traditional medicinal plants" }
  ]);
  const [products, setProducts] = useState<Product[]>([...gearProducts, ...dailyProducts]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update category counts based on current products
  const getUpdatedCategories = (type: 'gear' | 'daily') => {
    const typeProducts = products.filter(p => p.type === type);
    const typeCats = categories.filter(c => c.type === type);
    
    return [
      { name: "All", count: typeProducts.length },
      ...typeCats.map(cat => ({
        name: cat.name,
        count: typeProducts.filter(p => p.category === cat.name).length
      }))
    ];
  };

  const currentGearCategories = getUpdatedCategories('gear');
  const currentDailyCategories = getUpdatedCategories('daily');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.name && newCategory.type) {
      const newCat: Category = {
        id: categories.length + 1,
        name: newCategory.name,
        type: newCategory.type,
        description: newCategory.description || ''
      };
      setCategories(prev => [...prev, newCat]);
      setShowAddCategory(false);
      setNewCategory({ type: activeTab });
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.category && newProduct.price && newProduct.stock) {
      if (editingProduct) {
        // Update existing product
        setProducts(prev => prev.map(p => 
          p.id === editingProduct.id 
            ? { ...editingProduct, ...newProduct } as Product
            : p
        ));
      } else {
        // Add new product
        const newProd: Product = {
          id: products.length + 1,
          name: newProduct.name,
          category: newProduct.category,
          subCategory: newProduct.subCategory || '',
          price: newProduct.price,
          rating: 0,
          reviews: 0,
          stock: newProduct.stock,
          image: newProduct.image || '',
          description: newProduct.description || '',
          features: newProduct.features || [],
          type: newProduct.type || activeTab
        };
        setProducts(prev => [...prev, newProd]);
      }
      setShowAddProduct(false);
      setNewProduct({ type: activeTab, features: [] });
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesType = product.type === activeTab;
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesCategory && matchesSearch;
  });

  const addFeature = (feature: string) => {
    setNewProduct(prev => ({
      ...prev,
      features: [...(prev.features || []), feature]
    }));
  };

  // Update the category select in Add Product form
  const availableCategories = categories.filter(cat => cat.type === activeTab);

  // Update the click handler for edit button
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      ...product,
      features: [...product.features]
    });
    setShowAddProduct(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shop Dashboard</h1>
              <p className="mt-1 text-gray-600">Manage adventure gear and daily needs products</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 lg:min-w-[300px]">
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'gear' ? 'gear' : 'daily needs'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={() => setShowAddProduct(true)}
                className="px-4 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <FaPlus className="text-sm" />
                <span className="hidden sm:inline">Add Product</span>
              </button>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="mt-8">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-full w-fit">
              <button
                onClick={() => {
                  setActiveTab('gear');
                  setSelectedCategory('All');
                }}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                  activeTab === 'gear'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Adventure Gear
              </button>
              <button
                onClick={() => {
                  setActiveTab('daily');
                  setSelectedCategory('All');
                }}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                  activeTab === 'daily'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Daily Needs
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Admin Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => setShowAddProduct(true)}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-400 bg-opacity-30 rounded-xl">
                <FaBox className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium bg-blue-400 bg-opacity-30 px-3 py-1 rounded-full">
                Add New
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Add Product</h3>
            <p className="text-blue-100 text-sm">Create new product listings</p>
            <div className="mt-4 flex justify-end">
              <FaPlus className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => setShowAddCategory(true)}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-400 bg-opacity-30 rounded-xl">
                <FaLayerGroup className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium bg-purple-400 bg-opacity-30 px-3 py-1 rounded-full">
                Manage
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Add Category</h3>
            <p className="text-purple-100 text-sm">Organize your products</p>
            <div className="mt-4 flex justify-end">
              <FaPlus className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-400 bg-opacity-30 rounded-xl">
                <FaTag className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium bg-green-400 bg-opacity-30 px-3 py-1 rounded-full">
                {activeTab === 'gear' ? gearProducts.length : dailyProducts.length}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Total Products</h3>
            <p className="text-green-100 text-sm">Active product listings</p>
            <div className="mt-4 flex justify-end">
              <div className="flex -space-x-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-green-400 bg-opacity-30 border-2 border-white flex items-center justify-center text-sm font-medium">
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-400 bg-opacity-30 rounded-xl">
                <FaBox className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium bg-red-400 bg-opacity-30 px-3 py-1 rounded-full">
                {filteredProducts.filter(p => p.stock < 10).length}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Low Stock</h3>
            <p className="text-red-100 text-sm">Products need attention</p>
            <div className="mt-4 flex justify-end">
              <div className="h-10 flex items-end">
                {[40, 70, 30, 80, 20, 90].map((height, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-red-400 bg-opacity-30 rounded-full mx-0.5 transform transition-all duration-300 group-hover:scale-y-110"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Sub-Categories</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <FaChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div className={`space-y-2 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {(activeTab === 'gear' ? currentGearCategories : currentDailyCategories).map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full px-4 py-2.5 rounded-xl text-left flex justify-between items-center transition-all duration-200 ${
                      selectedCategory === category.name
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      selectedCategory === category.name
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-green-600 mb-1">Total Products</p>
                  <p className="text-2xl font-bold text-green-700">
                    {activeTab === 'gear' ? gearProducts.length : dailyProducts.length}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-600 mb-1">Low Stock Items</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {filteredProducts.filter(p => p.stock < 10).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                >
                  {/* Product Image with Hover Effect */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Floating Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="p-2 bg-white/90 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200 shadow-lg"
                        title="Edit Product"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setProductToDelete(product.id);
                          setShowDeleteConfirm(true);
                        }}
                        className="p-2 bg-white/90 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-200 shadow-lg"
                        title="Delete Product"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Status Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.discountedPrice && (
                        <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full shadow-lg">
                          {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                        </span>
                      )}
                      {product.stock < 10 && (
                        <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full shadow-lg">
                          Low Stock
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400 w-4 h-4" />
                          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                          <span className="text-sm text-gray-500">({product.reviews})</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    </div>

                    {/* Features Tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Stock */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <FaRupeeSign className="text-gray-700" />
                          <span className="text-xl font-bold text-gray-900">
                            {product.discountedPrice || product.price}
                          </span>
                          {product.discountedPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {product.stock} in stock
                        </div>
                      </div>
                      <button 
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-lg transform hover:scale-110"
                        title="Add to Cart"
                      >
                        <FaShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter to find what you&apos;re looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Add New Category</h2>
              <button
                onClick={() => setShowAddCategory(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={newCategory.name || ''}
                  onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={newCategory.description || ''}
                  onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Enter category description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="gear"
                      checked={newCategory.type === 'gear'}
                      onChange={e => setNewCategory({ ...newCategory, type: e.target.value as 'gear' | 'daily' })}
                      className="text-blue-500 focus:ring-blue-200"
                    />
                    <span>Adventure Gear</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="daily"
                      checked={newCategory.type === 'daily'}
                      onChange={e => setNewCategory({ ...newCategory, type: e.target.value as 'gear' | 'daily' })}
                      className="text-blue-500 focus:ring-blue-200"
                    />
                    <span>Daily Needs</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddCategory(false)}
                  className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Product</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(productToDelete!)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setShowAddProduct(false);
                  setEditingProduct(null);
                  setNewProduct({ type: activeTab, features: [] });
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={newProduct.name || ''}
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={newProduct.category || ''}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {availableCategories.map(cat => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={newProduct.price || ''}
                    onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    value={newProduct.stock || ''}
                    onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={newProduct.description || ''}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={newProduct.image || ''}
                  onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    id="feature"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Add a feature"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        if (input.value.trim()) {
                          addFeature(input.value.trim());
                          input.value = '';
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('feature') as HTMLInputElement;
                      if (input.value.trim()) {
                        addFeature(input.value.trim());
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newProduct.features?.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => {
                          setNewProduct(prev => ({
                            ...prev,
                            features: prev.features?.filter((_, i) => i !== index)
                          }));
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineShopPage;
