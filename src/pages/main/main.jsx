import "./main.scss";
import Navigation from "../../components/main/navigation/navigation.jsx";
import Basket from "../../components/main/basket/basket.jsx";
import Product from "../../components/main/product/product.jsx";
import Modal from "../../components/main/modal/modal.jsx";
import menuBase from "../../data/menu.json";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

export default function Main() {
    const [basket, setBasket] = useState([]);
    const [menu, setMenu] = useState(menuBase);
    const [selected, setSelected] = useState(menuBase[0].name);
    const [isOpen, setIsOpen] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const [item, setItem] = useState(null);
    const navigate = useNavigate();

    const stateBasket = { basket, setBasket };
    const stateMenu = { menu, setMenu };
    const stateSelected = { selected, setSelected };
    const stateIsOpen = { isOpen, setIsOpen };

    const currentCategory = menu.find((category) => category.name === selected);

    // Логика выхода
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate("/login");
        }).catch((error) => {
            console.error("Ошибка выхода:", error.message);
        });
    };

    const handleProfileClick = () => {
        navigate("/profile");
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

            <button className="profile-button" onClick={handleProfileClick}>
                Перейти в профиль
            </button>

            <button className="close-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
