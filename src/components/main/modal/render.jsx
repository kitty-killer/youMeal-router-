import AddModal from "../addModal/addModal.jsx";
import TakeOrder from "../takeOrder/takeOrder.jsx";

export default function Render({categoryId, item, stateBasket, closeModal}) {
    switch (categoryId) {
        case "addToBasket":
            return <AddModal item={item} stateBasket={stateBasket} closeModal={closeModal}/>;
        
        case "makeOrder":
            return <TakeOrder/>;
        default:
            break;
    }
}