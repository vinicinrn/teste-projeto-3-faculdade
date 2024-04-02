import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ShoppingCart from "../../components/ShoppingCart";
import useAuth from "../../hooks/useAuth";
import "../../styles/ShoppingCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const Home = () => {
  const [cartVisibility, setCartVisibility] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();

  const addProductToCart = (product) => {
    const existingProduct = products.find((p) => p.id === product.id);
    if (existingProduct) {
      const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, count: p.count + 1 } : p
      );
      setProducts(updatedProducts);
    } else {
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        count: 1,
      };
      setProducts([...products, newProduct]);
    }
  };

  const removeProductFromCart = (productId) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    setProducts(updatedProducts);
  };

  const updateProductQuantity = (productId, newQuantity) => {
    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, count: newQuantity } : p
    );
    setProducts(updatedProducts);
  };

  const calculateTotalPrice = () => {
    const totalPrice = products.reduce(
      (total, product) => total + product.price * product.count,
      0
    );
    return totalPrice.toFixed(2);
  };

  // Produtos
  const productsList = [
    {
      id: 1,
      name: "Açaí",
      description: "Açaí 500ML acompanhado de morango, banana, granola e mirtilo.",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1684403731883-67a71a793d2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 2,
      name: "Coxinha",
      description: "Coxinha de frango com catupiry.",
      price: 4.99,
      image: "https://st4.depositphotos.com/5344180/38056/i/600/depositphotos_380569806-stock-photo-typical-brazilian-salty-called-coxinha.jpg",
    },
  ];
  

  const handleViewCart = () => {
    setCartVisibility(true);
  };

  const handleHideCart = () => {
    setCartVisibility(false);
  };

  const handleCheckout = () => {
    // Lógica para finalizar a compra
  };

  return (
    <div className="Carrinho">
      <div className="navbar">
        <h3 className="logo"></h3>
        <div className="cart-header">
          <button
            className="btn-close-cart"
            onClick={() => setCartVisibility(!cartVisibility)}
          >
            <AiFillCloseCircle />
          </button>
          <button
            className="btn shopping-cart-btn"
            onClick={() => setCartVisibility(!cartVisibility)}
          >
            Carrinho ({products.length})
          </button>
        </div>
      </div>
      <main>
        <h2 className="title">Produtos</h2>
        <div className="products">
          {productsList.map((product) => (
            <div className="product" key={product.id}>
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
              <h4 className="product-name">{product.name}</h4>
              <p>{product.description}</p>
              <span className="product-price">{product.price}$</span>
              <div className="buttons">
                <button className="btn btn-details">Detalhes</button>
                <button
                  className="btn btn-add-to-cart"
                  onClick={() => addProductToCart(product)}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      {cartVisibility && (
        <div className="cart-overlay">
          <div className="cart-container">
            <button className="btn-close-cart" onClick={handleHideCart}>
              Fechar Carrinho
            </button>
            <h2>Carrinho de Compras</h2>
            <div className="cart-items">
              {products.map((product) => (
                <div className="cart-item" key={product.id}>
                  <div className="cart-item-details">
                    <h4>{product.name}</h4>
                    <p>Preço: R$ {product.price}</p>
                    <div className="cart-item-quantity">
                      <button
                        className="btn-quantity"
                        onClick={() =>
                          updateProductQuantity(product.id, product.count - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={product.count}
                        onChange={(e) =>
                          updateProductQuantity(
                            product.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <button
                        className="btn-quantity"
                        onClick={() =>
                          updateProductQuantity(product.id, product.count + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn-remove"
                      onClick={() => removeProductFromCart(product.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Resumo do Carrinho</h3>
              <p>Total de Produtos: {products.length}</p>
              <p>Total: R$ {calculateTotalPrice()}</p>
              <Button onClick={handleCheckout}>Finalizar Compra</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
