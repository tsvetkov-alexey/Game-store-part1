import React, { useState, useContext } from 'react';
import axios from 'axios';
import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, onRemove, items = [], opened}) => {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = useState(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://63ff6846571200b7b7dd4135.mockapi.io/orders', {
                items: cartItems,
            });
            setOrderId(data.id)
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://63fb6c024e024687bf783b8a.mockapi.io/cart/' + item.id);
                await delay(1000);
            }

        } catch (error) {
            alert('Ошибка при создании заказа');
        }
        setIsLoading(false);
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">Корзина <img className="removeBtn cu-p" src='/img/btn-remove.svg' alt='Close' onClick={onClose}/></h2>

                {
                    items.length > 0 
                        ?
                        <div className='d-flex flex-column flex'> 
                            <div className="items flex">
                                {items.map((obj) => (
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div 
                                        style={{
                                            backgroundImage: `url(${obj.imageUrl})`,
                                            width: '150px'
                                        }} 
                                        className="cartItemImg">
                                    </div>

                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img className="removeBtn" onClick={() => onRemove(obj.id)} src='/img/btn-remove.svg' alt='Remove'/>
                                </div>
                                ))}
                                
                            </div>
                                <div className="cartTotalBlock">
                                <ul className="cartTotalBlock">
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб.</b>
                                    </li>
                                    <li>
                                        <span>Налог 7,25%:</span>
                                        <div></div>
                                        <b>{Math.round(totalPrice * 0.0725)} руб.</b>
                                    </li>
                                </ul>
                                <button className="greenButton" onClick={onClickOrder} disabled={isLoading}>
                                    Оформить заказ <img src='/img/arrow.svg' alt='Arrow' />
                                </button>
                            </div>
                        </div>
                        
                        :
                        <Info 
                            title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну игру, чтобы сделать заказ" }
                            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                        /> 
                }

    

                

            
            </div>
        </div>
    )
}

export default Drawer
