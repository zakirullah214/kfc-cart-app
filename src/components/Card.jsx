import React, { useState } from "react";
import Header from "./Header";

export default function Card() {
  const [cartItems] = useState([
    {
      id: 1,
      name: "Krunch Chicken Combo",
      description: "1 Krunch burger + 1 pc of Hot and Crispy Fried Chicken + 1 Regular drink+ Dinner roll",
      price: 500,
      img: "https://www.kfcpakistan.com/images/43a98620-ffaa-11ed-b6b3-6970cc1cd666-krunch-with-combo-2023-05-31115706.png",
    },
    {
      id: 2,
      name: "Chicken & Chips",
      description: "2 pieces of Hot and Crispy Fried Chicken+ Fries + Dinner roll+ signature Vietnamese",
      price: 800,
      img: "https://www.kfcpakistan.com/images/43a9fb50-ffaa-11ed-8180-812e571998fe-chicken-n-chips-2023-05-31115706.png",
    },
    {
      id: 3,
      name: "Boneless Strips",
      description: "Tender boneless strips, black pepper mayo, diced tomatoes and lettuce- wrapped",
      price: 600,
      img: "https://www.kfcpakistan.com/images/3fda5fc0-c1c8-11ee-88d6-317ad09e56fd-Chicken-Strips_variant_0-2024-02-02124030.png",
    },
    {
      id: 4,
      name: "Family Festival 3",
      description: "Tender boneless strips, black pepper mayo, diced tomatoes and lettuce- wrapped",
      price: 900,
      img: "https://www.kfcpakistan.com/images/43a9fb50-ffaa-11ed-8180-812e571998fe-family-Festivle-3-2023-05-31115706.png",
    },
  ]);

  const [cart, setCart] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const handleIncrement = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, count: 1 }]);
    }
    setItemsCount(itemsCount + 1);
    setCartTotal(cartTotal + item.price);
  };

  const handleDeleteOne = (id) => {
    const itemToDelete = cart.find((item) => item.id === id);
    if (!itemToDelete) return;

    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0);

    setCart(updatedCart);
    setItemsCount(itemsCount - 1);
    setCartTotal(cartTotal - itemToDelete.price);
  };

  return (
    <div className="container-fluid">
      <Header
        cart={cart}
        itemsCount={itemsCount}
        cartTotal={cartTotal}
        handleDeleteOne={handleDeleteOne}
      />

      <div className="container-fluid my-2">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {cartItems.map((item) => (
            <div key={item.id} className="">
              <div className="card" style={{ width: "100%" }}>
                <img src={item.img} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p>Price: {item.price}</p>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleIncrement(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
