import "./takeOrder.scss";
import donut from "../../../assets/images/donut.png";
import { useState } from "react";

export default function TakeOrder() {
    const [deliveryType, setDeliveryType] = useState("option1");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        floor: "",
        door: "",
    });
    const [error, setError] = useState("");

    const pickupLocations = ["ул. Ленина, д.5", "ул. Советская, д.10", "пр-т Победы, д.15"];

    const validateForm = () => {
        if (!formData.name || !formData.phone || (deliveryType === "option2" && !formData.address)) {
            setError("Пожалуйста, заполните все обязательные поля.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Форма успешно отправлена!", formData);

        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    return (
        <div className="wr-modal">
            <div className="order-content">
                <div className="left-part">
                    <img src={donut} alt="donut" />
                </div>

                <div className="right-part">
                    <h1>Доставка</h1>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Ваше имя"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="phone"
                            placeholder="Телефон"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        <div className="radio-block">
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="choice"
                                    value="option1"
                                    checked={deliveryType === "option1"}
                                    onChange={() => setDeliveryType("option1")}
                                />
                                <span className="custom-radio"></span>
                                Самовывоз
                            </label>

                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="choice"
                                    value="option2"
                                    checked={deliveryType === "option2"}
                                    onChange={() => setDeliveryType("option2")}
                                />
                                <span className="custom-radio"></span>
                                Доставка
                            </label>
                        </div>

                        {deliveryType === "option1" ? (
                            <select
                                id="pickup-location"
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        address: e.target.value,
                                    }))
                                }
                            >
                                <option value="" disabled>
                                    Выберите адрес самовывоза
                                </option>
                                {pickupLocations.map((location, index) => (
                                    <option key={index} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder="Улица, дом, квартира"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                                <div className="floor-door">
                                    <input
                                        type="text"
                                        placeholder="Этаж"
                                        id="floor"
                                        value={formData.floor}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Домофон"
                                        id="door"
                                        value={formData.door}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit">Оформить</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
