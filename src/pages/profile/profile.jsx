import { useState, useEffect } from "react";
import "./profile.scss";
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
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

    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                const savedData = JSON.parse(localStorage.getItem(`userProfile_${user.uid}`));
                const savedAvatar = localStorage.getItem(`userAvatar_${user.uid}`);

                if (savedData) {
                    setUserData(prev => ({
                        ...prev,
                        ...savedData,
                        avatar: savedAvatar || prev.avatar
                    }));
                } else {
                    setUserData(prev => ({
                        ...prev,
                        email: user.email || ""
                    }));
                }
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    useEffect(() => {
        const timer = setInterval(() => {
            checkRequiredFields();
        }, 30000);

        return () => clearInterval(timer);
    }, [userData]);

    const checkRequiredFields = () => {
        const requiredFields = ['fullName', 'phone', 'address'];
        const incompleteFields = requiredFields.filter(field => !userData[field]);

        if (incompleteFields.length > 0) {
            toast.warning(
                <div>
                    <h4>Пожалуйста, заполните профиль полностью</h4>
                    <p>Не заполнены: {incompleteFields.map(field => {
                        switch(field) {
                            case 'fullName': return 'ФИО';
                            case 'phone': return 'Телефон';
                            case 'address': return 'Адрес';
                            default: return field;
                        }
                    }).join(', ')}</p>
                </div>,
                {
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserData((prev) => ({
                    ...prev,
                    avatar: e.target.result
                }));

                localStorage.setItem(`userAvatar_${userId}`, e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (!userId) return;

        localStorage.setItem(`userProfile_${userId}`, JSON.stringify(userData));
        toast.success('Профиль успешно сохранен!', {
            autoClose: 3000,
        });

        checkRequiredFields();
    };

    const goToOrderHistory = () => {
        navigate('/order-history');
    };
    const handleAvatarClick = () => {
        document.getElementById("avatar-upload").click();
    };

    return (
        <div className="profile-container">
            <ToastContainer position="top-right" />
            <div className="profile-card">
                <div className="profile-header">
                    <h1>Личный кабинет</h1>
                    <div className="avatar" onClick={handleAvatarClick}>
                        {userData.avatar ?
                            <img src={userData.avatar} alt="Аватар" /> :
                            <div className="placeholder">Фото</div>
                        }
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="avatar-upload"
                        />
                    </div>
                </div>
                <div className="profile-content">
                    <div className="profile-form">
                        <label>ФИО*: <input type="text" name="fullName" value={userData.fullName} onChange={handleChange} required /></label>
                        <label>Email: <input type="email" name="email" value={userData.email} onChange={handleChange} disabled /></label>
                        <label>Телефон*: <input type="tel" name="phone" value={userData.phone} onChange={handleChange} required /></label>
                        <label>Адрес*: <input type="text" name="address" value={userData.address} onChange={handleChange} required /></label>
                        <label>Город: <input type="text" name="city" value={userData.city} onChange={handleChange} /></label>
                        <label>Почтовый индекс: <input type="text" name="postalCode" value={userData.postalCode} onChange={handleChange} /></label>
                        <label>Дата рождения: <input type="date" name="birthDate" value={userData.birthDate} onChange={handleChange} /></label>
                        <label>Способ доставки:
                            <select name="deliveryPreference" value={userData.deliveryPreference} onChange={handleChange}>
                                <option value="">Выберите...</option>
                                <option value="Курьер">Курьер</option>
                                <option value="Самовывоз">Самовывоз</option>
                                <option value="Почта">Почта</option>
                            </select>
                        </label>
                        <label>Заметки: <textarea name="notes" value={userData.notes} onChange={handleChange}></textarea></label>
                        <button type="button" onClick={handleSave} className="save-btn">Сохранить профиль</button>
                    </div>
                    <button className="order-history" onClick={goToOrderHistory}>История заказов</button>
                </div>
            </div>
        </div>
    );
}
