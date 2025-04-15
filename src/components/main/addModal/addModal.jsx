import "./addModal.scss"

import { Helper } from "./helper.js";

import { useState } from "react";

export default function AddModal({item, stateBasket, closeModal}){
    const {id, name, img, weight, price, description, compos, calories} = item;

    const {basket, setBasket} = stateBasket;

    const [addAmount, setAddAmount] = useState(0);


    return(
        <div className="wr-modal">
            <div className="modal-content">
                <div className="topPart">
                    <h1>{name}</h1>
                </div>

                <div className="modal-img-wr">
                    <img src={img} alt={name}/>
                </div>

                <div className="text-content">
                    <p className="descr">{description}</p>

                    <div className="comps">
                        <h1>Состав:</h1>
                        <ul>
                            {compos.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>

                    <div className="nutritional-value">
                        <span>{weight}г, </span>
                        <span>ккал {calories}</span>
                    </div>

                </div>

                <button className={`add-btn-modal ${addAmount === 0 ? "add-btn-disabled" : ""}`} disabled={addAmount === 0} onClick={() => {Helper(id, basket, setBasket, {...item}, addAmount); closeModal()}}>Добавить</button>

                <div className="add">
                    <div className="amount-control">
                        <button onClick={() => {if(addAmount !== 0) setAddAmount(addAmount => addAmount - 1) }}>-</button>
                        <p>{addAmount}</p>
                        <button onClick={() => setAddAmount(addAmount => addAmount + 1)}>+</button>
                    </div>

                    <p className="modal-price">{price}₽</p>
                </div>
            </div>
        </div>
    )
}