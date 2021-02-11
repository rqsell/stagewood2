import React, { useState } from "react";
import "../styles/items.css";
// import Cart from "./Cart";
function Items({ Cart, setCart }) {
  // const [cart, setCart] = useState([]);
  const [products] = useState([
    {
      name: 'Air Jordan 1 Mid "Chicago 2020"',
      cost: "195",
      img:
        "https://www.stadiumgoods.com/cdn-cgi/image/fit%3Dcontain%2Cformat%3Dauto%2Cwidth%3D2000/media/catalog/product/5/5/554724-173_1.png",
    },
    {
      name: 'Air Jordan 6 Retro "Defining Moments"',
      cost: "225",
      img:
        "https://image.goat.com/crop/750/attachments/product_template_additional_pictures/images/032/390/392/original/526250_01.jpg.jpeg?1580925808",
    },
    {
      name: "Jordan 1 Retro High Pine Green Black",
      cost: "170",
      img:
        "https://stockx-360.imgix.net/Air-Jordan-1-Retro-High-Pine-Green-Black/Images/Air-Jordan-1-Retro-High-Pine-Green-Black/Lv2/img20.jpg?auto=format,compress&q=90&updated_at=1606323349&w=1000",
    },
    {
      name: "Air Jordan 4 Retro SE 'What The 4'",
      cost: "200",
      img:
        "https://image.goat.com/crop/750/attachments/product_template_additional_pictures/images/028/286/211/original/503839_01.jpg.jpeg?1573502565",
    },
  ]);

  const addtocart = (product) => {
    console.log("hello");
    setCart([...Cart, product]);
  };

  return (
    <div className="page">
      <h1>Products</h1>
      <button>Show Cart ({Cart.length})</button>
      <div className="products">
        {products.map((product, idx) => (
          <div className="itembox" key={idx}>
            <h3>{product.name}</h3>
            <h4>{product.cost}</h4>
            <img className="productimg" src={product.img} />
            <div>
              <button
                onClick={(e) => {
                  addtocart(product, idx);
                }}
              >
                Add to Cart
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
