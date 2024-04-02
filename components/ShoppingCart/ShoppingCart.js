import React from "react";
import "../styles/ShoppingCart.css";

function ShoppingCart({
  visibility,
  products,
  onProductsRemove,
  onClose,
  onQuantityChange,
}) {
  return (
    <div
      className="modal"
      style={{
        display: visibility ? "block" : "none",
      }}
    >
      <div className="ShoppingCart">
        <div className="header">
          <h2>Carrinho</h2>
          <button className="btn-close-btn" onClick={onClose}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className="cart-products">
          {products.length === 0 && (
            <span className="empty-text">Seu carrinho está vazio!</span>
          )}
          {products.map((product) => (
            <div className="cart-product" key={product.id}>
              <div className="product-info">
                <h3>{product.name}</h3>
                <span className="product-price">
                  {product.price * product.count}$
                </span>
              </div>
              <select
                className="count"
                value={product.count}
                onChange={(event) => {
                  onQuantityChange(product.id, event.target.value);
                }}
              >
                {[...Array(10).keys()].map((number) => {
                  const num = number + 1;
                  return (
                    <option value={num} key={num}>
                      {num}
                    </option>
                  );
                })}
              </select>
              <button
                className="btn remove-btn"
                onClick={() => onProductsRemove(product)}
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          ))}
          {products.length > 0 && (
            <button className="btn btn-checkout">Finalizar compra</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
