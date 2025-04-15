import "./Product.scss";
import { handleAddToBasket, handleImageClick } from "./helper.js";

export default function Products(props) {
    const { basket, setBasket } = props.stateBasket;
    const { setIsOpen } = props.stateIsOpen;

    return (
        <div className="card">
            <div
                className="img-wr"
                onClick={() => handleImageClick(props, setIsOpen, props.setCategoryId, props.setItem)}
            >
                <img src={props.img} alt={props.name} />
            </div>

            <div className="text-block">
                <h3>{props.price}₽</h3>
                <p className="burger-name">{props.name}</p>
                <p className="burger-weight">{props.weight}г</p>
            </div>

            <button
                className="add-btn"
                onClick={() => handleAddToBasket(props, basket, setBasket)}
            >
                Добавить
            </button>
        </div>
    );
}
