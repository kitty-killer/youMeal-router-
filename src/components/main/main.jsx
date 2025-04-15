import "./main.scss";
import Navigation from "./navigation/navigation.jsx";
import Basket from "./basket/basket.jsx";
import Product from "./product/product.jsx";
import Modal from "./modal/modal.jsx";
import menuBase from "../../data/menu.json";
import { useState } from "react";

export default function Main() {
    const [basket, setBasket] = useState([]);
    const [menu, setMenu] = useState(menuBase);
    const [selected, setSelected] = useState(menuBase[0].name);
    const [isOpen, setIsOpen] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const [item, setItem] = useState(null);

    const stateBasket = { basket, setBasket };
    const stateMenu = { menu, setMenu };
    const stateSelected = { selected, setSelected };
    const stateIsOpen = { isOpen, setIsOpen };

    const currentCategory = menu.find((category) => category.name === selected);

    // Логика выхода
    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated"); // Удаляем флаг авторизации
        window.location.href = "/"; // Перенаправление на страницу входа
    };

    return (
        <div className="wr-main">
            <div className="container">
                <div className="nav-container">
                    <Navigation stateMenu={stateMenu} stateSelected={stateSelected} />
                </div>

                <div className="main-container">
                    <Basket
                        stateBasket={stateBasket}
                        setCategoryId={setCategoryId}
                        stateIsOpen={stateIsOpen}
                    />
                    <div className="card-block">
                        <div className="card-holder">
                            <h1 className="selected-items">{selected}</h1>
                            {currentCategory.items.map((item) => (
                                <Product
                                    key={item.id}
                                    {...item}
                                    stateIsOpen={stateIsOpen}
                                    setCategoryId={setCategoryId}
                                    setItem={setItem}
                                    stateBasket={stateBasket}
                                />
                            ))}
                        </div>
                    </div>

                    <Modal
                        categoryId={categoryId}
                        isOpen={isOpen}
                        closeModal={() => {
                            setIsOpen(false);
                        }}
                        item={item}
                        stateBasket={stateBasket}
                    />
                </div>
            </div>
            {/* Кнопка выхода */}
            <button
                onClick={handleLogout}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#ff4d4f",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                Logout
            </button>
        </div>
    );
}
