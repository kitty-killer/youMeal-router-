import "./main.scss";
import Navigation from "./navigation/navigation.jsx";
import Basket from "./basket/basket.jsx";
import Product from "./product/product.jsx";
import Modal from "./modal/modal.jsx";
import menuBase from "../../data/menu.json";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

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
        const auth = getAuth();
        signOut(auth).then(() => {
            window.location.href = "/login";
        }).catch((error) => {
            console.error("Ошибка выхода:", error.message);
        });
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
            <button className="close-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
