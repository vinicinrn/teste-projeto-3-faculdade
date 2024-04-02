import React from "react";


export default function ShoppingCart({
    visibility,
    products,
    onProductsRemove,
    onClose,
    onQuantityChange,
})  {
    return( 
    <div
      class="modal"
      style={{
        display: visibility 
        ? "block"
        : "none" }}>
          <div className="ShoppingCart">
          <div className="header">
            <h2>ShoppingCart</h2> 
            <button className="btn-close-btn" onClick={onClose}>X
            </button>
          </div>
          <div className="cart-products">
            {products.length === 0 && ( <span className="empty-text">
              Seu carrinho está vazio!
            </span>
           )}
               {products.map(product =>(
              <div className="cart-product" key={product.id}>
                <img src={product.image} alt={product.name}></img>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <span className="product-price"> {product.price * product.count}$ </span>
                  </div>
                  <select className="count" value={product.count} onChange={(event) =>{
                    onQuantityChange(product.id, event.target.value);
                  }}>
                    {
                      [...Array(10).keys()
                      ].map(number =>{
                        const num = number + 1;
                        return <option value={num} key={num}>{num}</option>
                    })
                    }
                  </select>
                  <button className="btn remove-btn" onClick={() => onProductsRemove(product)}>_
                  </button>
                </div>
            ))}
            {products.length > 0 && <button className="btn checkout-btn">Finalizar compra!</button>}
          </div>

          </div>
          
        </div>
    );
}    