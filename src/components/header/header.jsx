import logo from "../../assets/logo/logo.png"
import burgerMain from "../../assets/logo/burgerMain.png"

import "./header.scss"
import {useNavigate} from "react-router";

export default function Header(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    };
    return(
        <div className="wr-header">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>

                <div className="main-head">
                    <div className="img-wr">
                        <img src={burgerMain} alt="burger"/>
                    </div>

                    <div className="text-wr">
                        <div className="top">
                            <p>Только самые</p>
                            <p className="orange">сочные бургеры</p>
                        </div>

                        <div className="bottom">
                            <p>Бесплатная доставка от 599₽</p>
                            <button onClick={handleClick}>Добавить</button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}