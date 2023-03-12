import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart'

const Header = (props) => {
    const { totalPrice } = useCart(); 

    return (
        <>
        <header className="d-flex justify-between align-center p-40">
            <Link to='/'>
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/brandLogo.png" alt='logo'/>
                    <div>
                        <h3 className="text-uppercase">React Games</h3>
                        <p className="opacity-5">Магазин игр по лучшим ценам</p>
                    </div>
                </div>
            </Link>
            <div>
                <ul className="d-flex">
                    <li className="mr-30 cu-p" onClick={props.onClickCart}>
                        <img width={18} height={18} src="/img/cart.svg" alt='cart' />
                        <span>{totalPrice} руб.</span>
                    </li>
                    <li className="mr-15 cu-p">
                        <Link to='/favourites'>
                            <img width={18} height={18} src="/img/heart.svg" alt='Favs'/>
                        </Link>
                    </li>
                    <li>
                        <Link to='/orders'>
                            <img width={18} height={18} src="/img/user.svg" alt='user'/>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
        <div className='banner'>
            <Link to='/'>
                <img height={300} width='90%' src="/img/banner.jpg" alt="banner" className='banner'/>
            </Link>
        </div>
        
        </>
    ) 
}

export default Header
