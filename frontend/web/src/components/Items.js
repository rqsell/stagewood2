import React, { useState } from "react";
import "../styles/items.css";
// import Cart from "./Cart";
function Items({ Cart, setCart }) {
  // const [cart, setCart] = useState([]);
  const [plant, setPlant] = useState();
  const [products] = useState([
    {
      name: "Gumbo Limbo",
      img: "https://miro.medium.com/max/1122/1*vF7AV4K2EeneOiUCmXtqlg.jpeg",
      api: "gumbo20%limbo",
    },
    {
      name: "Beautyberry",
      img:
        "https://gardeningsolutions.ifas.ufl.edu/images/plants/shrubs/beautyberry.jpg",
    },
    {
      name: "Seagrape",
      img:
        "https://gardeningsolutions.ifas.ufl.edu/images/plants/trees/seagrape_beach.jpg",
    },
    {
      name: "Prickly Pear",
      img:
        "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/nutraingredients-usa.com/news/manufacturers/product-based-on-prickly-pear-extract-takes-aim-at-jet-lag/10460217-1-eng-GB/Product-based-on-prickly-pear-extract-takes-aim-at-jet-lag_wrbm_large.jpg",
    },
  ]);
  const getPlant = async () => {
    const response = await fetch(
      "https://trefle.io/api/v1/plants?token=XpgmAh9e49lJGpwiyJ9-vtxcGJbx7IrSACqWOa-2-XU&filter[common_name]={product.api}"
    );
    const json = await response.json();
    setPlant(json);
    console.log(plant);
  };

  const addtocart = (product) => {
    console.log("hello");
    setCart([...Cart, product]);
  };

  return (
    <div className="page">
      <h1>Plants</h1>
      <button>Wheel Barrow({Cart.length})</button>
      <div className="products">
        {products.map((product, idx) => (
          <div className="itembox" key={idx}>
            <h3>{product.name}</h3>
            <img className="productimg" src={product.img} />
            <div>
              <button
                onClick={(e) => {
                  addtocart(product, idx);
                }}
              >
                Plant in Garden
              </button>
              <button
                onClick={(e) => {
                  getPlant(product);
                }}
              >
                {" "}
                More Info
              </button>
              {/* <Cart {...props} cart={cart} />; */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
