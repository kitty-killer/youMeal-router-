import "./basket.scss";
import Order from "../order/order.jsx";
import iconFreeDelivery from "../../../assets/icons/motobike.png";

const Basket = ({ stateBasket, setCategoryId, stateIsOpen }) => {
    const { basket, setBasket } = stateBasket;
    const { isOpen, setIsOpen } = stateIsOpen;

    const totalItems = basket.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalPrice = basket.reduce((sum, item) => sum + item.price * item.amount, 0);

    const openOrderModal = () => {
        setIsOpen(true);
        setCategoryId("makeOrder");
    };

    return (
        <div className="wr-basket">
            <div className="container">
                <div className="header">
                    <p>Корзина</p>
                    <div className="item-count">
                        <p>{totalItems}</p>
                    </div>
                </div>

                {basket.length === 0 ? (
                    <div className="empty-basket">
                        <p>Ваша корзина пуста:(</p>
                    </div>
                ) : (
                    <>
                        <div className="order-list">
                            {basket.map((product) => (
                                <Order key={product.id} {...product} basket={basket} setBasket={setBasket} />
                            ))}
                        </div>

                        <div className="summary">
                            <p>Итого</p>
                            <p>{totalPrice}₽</p>
                        </div>

                        <button onClick={openOrderModal} className="checkout-button">
                            Оформить заказ
                        </button>

                        {(totalItems >= 7 || totalPrice >= 2500) && (
                            <div className="delivery-info">
                                <img src={iconFreeDelivery} alt="Free Delivery" />
                                <p>Бесплатная доставка</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Basket;
