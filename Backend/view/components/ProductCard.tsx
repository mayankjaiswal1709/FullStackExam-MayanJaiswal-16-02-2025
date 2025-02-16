"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-lg font-bold">${product.price}</div>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}