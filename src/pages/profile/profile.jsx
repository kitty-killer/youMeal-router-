import { useState, useEffect } from "react";
import "./profile.scss";
import { useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { db } from "../../firebase/firebaseConfig.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        birthDate: "",
        deliveryPreference: "",
        notes: "",
        avatar: null
    });

    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                const profileRef = ref(db, `users/${user.uid}/profile`);
                const snapshot = await get(profileRef);
                if (snapshot.exists()) {
                    setUserData({ ...snapshot.val(), email: user.email });
                } else {
                    setUserData(prev => ({ ...prev, email: user.email }));
                }
            } else {
                navigate("/login");
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            const required = ["fullName", "phone", "address"];
            const missing = required.filter((f) => !userData[f]);
            if (missing.length > 0) {
                toast.warning(`Заполните: ${missing.join(", ")}`, { autoClose: 6000 });
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            setUserData((prev) => ({ ...prev, avatar: e.target.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleAvatarClick = () => {
        document.getElementById("avatar-upload").click();
    };

    const handleSave = async () => {
        if (!userId) return;
        const profileRef = ref(db, `users/${userId}/profile`);
        await set(profileRef, userData);
        toast.success("Профиль сохранён!");
    };

    const goToOrderHistory = () => {
        navigate("/order-history");
    };

    return (
        <div className="profile-container">
            <ToastContainer />
            <div className="profile-card">
                <div className="profile-header">
                    <h1>Личный кабинет</h1>
                    <div className="avatar" onClick={handleAvatarClick}>
                        {userData.avatar ? (
                            <img src={userData.avatar} alt="Аватар" />
                        ) : (
                            <div className="placeholder">Фото</div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            id="avatar-upload"
                        />
                    </div>
                </div>

                <div className="profile-content">
                    <div className="profile-form">
                        <label>ФИО*:
                            <input type="text" name="fullName" value={userData.fullName} onChange={handleChange} required />
                        </label>
                        <label>Email:
                            <input type="email" name="email" value={userData.email} disabled />
                        </label>
                        <label>Телефон*:
                            <input type="tel" name="phone" value={userData.phone} onChange={handleChange} required />
                        </label>
                        <label>Адрес*:
                            <input type="text" name="address" value={userData.address} onChange={handleChange} required />
                        </label>
                        <label>Город:
                            <input type="text" name="city" value={userData.city} onChange={handleChange} />
                        </label>
                        <label>Почтовый индекс:
                            <input type="text" name="postalCode" value={userData.postalCode} onChange={handleChange} />
                        </label>
                        <label>Дата рождения:
                            <input type="date" name="birthDate" value={userData.birthDate} onChange={handleChange} />
                        </label>
                        <label>Способ доставки:
                            <select name="deliveryPreference" value={userData.deliveryPreference} onChange={handleChange}>
                                <option value="">Выберите...</option>
                                <option value="Курьер">Курьер</option>
                                <option value="Самовывоз">Самовывоз</option>
                                <option value="Почта">Почта</option>
                            </select>
                        </label>
                        <label>Заметки:
                            <textarea name="notes" value={userData.notes} onChange={handleChange}></textarea>
                        </label>
                        <button onClick={handleSave} className="save-btn">Сохранить профиль</button>
                    </div>
                    <button className="order-history" onClick={goToOrderHistory}>История заказов</button>
                </div>
            </div>
        </div>
    );
}
