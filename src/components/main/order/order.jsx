import "./order.scss"

import { adjustItemQuantity } from "./helper/helper"

export default function Order({id, name, img, weight, price, amount, basket, setBasket}){

    return (
        <div className="wr-orders">
            <div className="order-box">
                <div className="left">
                    <div className="img-wrapper">
                        <img src={img} alt="food"/>
                    </div>

                    <div className="discription">
                        <h1>{name}</h1>
                        <p className="weight">{weight}г</p>
                        <p className="price-order">{price}₽</p>
                    </div>
                </div>

                <div className="amount-control">
                    <button onClick={() => adjustItemQuantity(id, -1, basket, setBasket)}>-</button>
                    <p>{amount}</p>
                    <button onClick={() => adjustItemQuantity(id, 1, basket, setBasket)}>+</button>
                </div>

            </div>

        </div>
    )
}