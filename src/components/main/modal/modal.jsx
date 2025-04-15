import Render from "./render.jsx";
import "./modal.scss"
import cross from "../../../assets/icons/cross.png";

export default function Modal({categoryId, isOpen, closeModal, item, stateBasket}) {
    if(!isOpen) return null;
    
    return(
        <div className="modal">
            <div className="modal-body">
                <Render categoryId={categoryId} item={item} stateBasket={stateBasket} closeModal={closeModal}/>
                <button className="cross" onClick={closeModal}><img src={cross} alt="cross"/></button>
            </div>
        </div>
    )
}