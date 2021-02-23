import React, { useState } from "react";
import "../styles/items.css";
// import Cart from "./Cart";
function Items({ Cart, setCart }) {
  // const [cart, setCart] = useState([]);
  const [plant, setPlant] = useState();
  const [toggle, setToggle] = useState(!true);
  const getPlant = async (product) => {
    const response = await fetch(
      `https://trefle.io/api/v1/plants?token=XpgmAh9e49lJGpwiyJ9-vtxcGJbx7IrSACqWOa-2-XU&filter[common_name]=${product.api}`
    );
    const json = await response.json();

    setPlant(json.data);
    console.log(plant);
    // console.log(plant.common_name);
  };

  // const getPlant = async () => {
  //   // console.log(product);
  //   const response = await fetch(
  //     "https://trefle.io/api/v1/plants?token=XpgmAh9e49lJGpwiyJ9-vtxcGJbx7IrSACqWOa-2-XU&filter[common_name]=gumbo%20limbo"
  //   );
  //   const json = await response.json();
  //   console.log(json);
  //   setPlant(json);
  //   console.log("cat", plant);
  // };
  const [products] = useState([
    {
      name: "Gumbo Limbo",
      img: "https://miro.medium.com/max/1122/1*vF7AV4K2EeneOiUCmXtqlg.jpeg",
      api: "gumbo%20limbo",
    },
    {
      name: "Firebush",
      img:
        "https://gardeningsolutions.ifas.ufl.edu/images/plants/flowers/firebush_butterfly.jpg",
      api: "firebush",
    },
    {
      name: "Seagrape",
      img:
        "https://gardeningsolutions.ifas.ufl.edu/images/plants/trees/seagrape_beach.jpg",
      api: "seagrape",
    },
    {
      name: "Eastern Redbud",
      img:
        "https://gardeningsolutions.ifas.ufl.edu/images/plants/trees/redbud_flowers.jpg",
      api: "eastern%20redbud",
    },
  ]);

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
