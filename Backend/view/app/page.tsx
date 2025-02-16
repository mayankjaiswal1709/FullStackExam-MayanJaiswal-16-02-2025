"use client";

import { ShoppingBag, Search, Users, Truck, Shield, Award } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import CartSheet from "@/components/CartSheet";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    category: "Accessories"
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    category: "Bags"
  },
  {
    id: 4,
    name: "Smart Speaker",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&q=80",
    category: "Electronics"
  }
];

const categories = ["All", "Electronics", "Accessories", "Bags"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [activeSection, setActiveSection] = useState("home");
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const filteredProducts = FEATURED_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const renderHomeContent = () => (
    <>
      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Products</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Shop the latest trends and discover premium quality products at competitive prices.
          </p>
          <Button size="lg" className="rounded-full" onClick={() => setActiveSection("shop")}>
            Shop Now
          </Button>
        </div>
      </section>

      <section id="products" className="py-16">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="categories" className="py-16 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.filter(cat => cat !== "All").map((category) => (
              <div
                key={`shop-category-${category}`}
                className="relative group overflow-hidden rounded-lg cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveSection("shop");
                  const productsSection = document.getElementById("products");
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                  <h3 className="text-xl font-semibold">{category}</h3>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary">View Products</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderAboutContent = () => (
    <section className="py-16">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About ShopNext</h1>
          <p className="text-lg text-muted-foreground">
            Founded in 2025, ShopNext has grown from a small startup to a leading e-commerce 
            platform, dedicated to providing high-quality products and exceptional customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Customer First</h3>
            <p className="text-muted-foreground">Our customers are at the heart of everything we do</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Secure Shopping</h3>
            <p className="text-muted-foreground">Your security and privacy are our top priorities</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground">Quick and reliable shipping to your doorstep</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Quality Products</h3>
            <p className="text-muted-foreground">Curated selection of premium products</p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
            <p className="text-muted-foreground text-center mb-8">
              To provide our customers with the best online shopping experience through 
              quality products, competitive prices, and exceptional customer service.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50K+</div>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">1000+</div>
                <p className="text-muted-foreground">Products</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <p className="text-muted-foreground">Customer Support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => setActiveSection("shop")}>
            Start Shopping
          </Button>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xl font-bold">ShopNext</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { id: "home", label: "Home" },
              { id: "shop", label: "Shop" },
              { id: "about", label: "About" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`${
                  activeSection === item.id 
                    ? "text-foreground" 
                    : "text-muted-foreground"
                } hover:text-foreground transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.name}
                </span>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
            <CartSheet />
          </div>
        </div>
      </header>

      <main>
        {activeSection === "about" ? renderAboutContent() : 
         activeSection === "shop" ? (
          <section className="py-16">
            <div className="container px-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className="text-3xl font-bold">Our Products</h2>
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No products found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </section>
         ) : renderHomeContent()}
      </main>

      <footer className="bg-muted py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <p className="text-muted-foreground">Discover amazing products at competitive prices.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><button className="text-muted-foreground hover:text-foreground">Contact Us</button></li>
                <li><button className="text-muted-foreground hover:text-foreground">Shipping Policy</button></li>
                <li><button className="text-muted-foreground hover:text-foreground">Returns & Exchanges</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveSection("shop")} className="text-muted-foreground hover:text-foreground">Shop</button></li>
                <li><button onClick={() => setActiveSection("about")} className="text-muted-foreground hover:text-foreground">About</button></li>
                <li><button className="text-muted-foreground hover:text-foreground">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-4">Subscribe to receive updates and exclusive offers.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-md border bg-background"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}