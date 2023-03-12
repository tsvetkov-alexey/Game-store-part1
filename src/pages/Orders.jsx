import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import AppContext from '../context';
const Orders = () => {
    const {onAddToFavourite, onAddToCart} = useContext(AppContext)
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            (async() => {
                try {
                    const { data } = await axios.get('https://63ff6846571200b7b7dd4135.mockapi.io/orders');
                    setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                    setIsLoading(false);
                } catch (error) {
                    alert('Ошибка при запросе заказов')
                    console.error(error)
                }
            })();
        }, [])
        return (
            <div className="content p-40">
                <div className="d-flex align-center mb-40 justify-between">
                      <h1>Мои заказы</h1>
                </div>
                  
                <div className="d-flex flex-wrap">
                      
                    {(isLoading 
                        ? [...Array(12)] 
                        : orders).map((item, index) => 
                        <Card
                            key={index} 
                            loading={isLoading}
                            {...item}
                        />
                    )}
                </div>
            </div>
        )
}

export default Orders;
