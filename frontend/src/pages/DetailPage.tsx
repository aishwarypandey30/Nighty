import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/menuItem";
import OrderSummary from "@/components/orderSummary";
import RestaurantInfo from "@/components/restaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { MenuItem as MenuItemType } from "../types";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>([]); 

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      if (existingCartItem) {
        return prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item._id !== cartItem._id)
    );
  };

  if (!restaurantId) return <div>Invalid restaurant</div>;
  if (isLoading || !restaurant) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
          alt={restaurant.name}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <OrderSummary cartItems={cartItems} removeFromCart={removeFromCart} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
