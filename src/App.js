import React, { createContext } from "react";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { useState, useEffect, useContext } from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from "./pages/Favourites";
import AppContext from "./context";
import Orders from "./pages/Orders";


function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [cartResponse, favouritesResponse, itemsResponse] = await Promise.all([
                    axios.get('https://63fb6c024e024687bf783b8a.mockapi.io/cart'),
                    axios.get('https://63ff6846571200b7b7dd4135.mockapi.io/favourites'),
                    axios.get('https://63fb6c024e024687bf783b8a.mockapi.io/items')
                ])

                setIsLoading(false);
    
                setCartItems(cartResponse.data);
                setFavourites(favouritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert('Ошибка при запросе данных');
                console.error(error);
            }

        }

        fetchData();
    }, []);
    
    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://63fb6c024e024687bf783b8a.mockapi.io/cart/${findItem.id}`);
            } else {
                setCartItems(prev => [...prev, obj]);
                const { data } = await axios.post('https://63fb6c024e024687bf783b8a.mockapi.io/cart', obj)
                setCartItems(prev => prev.map(item => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        };
                    }
                    return item;
                }));
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину');
            console.error(error);
        }
        
    }
    

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://63fb6c024e024687bf783b8a.mockapi.io/cart/${id}`)
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
        } catch (error) {
            alert('Ошибка при удалении из корзины');
            console.error(error);
        }
    }

    const onAddToFavourite = async (obj) => {
        try {
            if (favourites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://63ff6846571200b7b7dd4135.mockapi.io/favourites/${obj.id}`);
                setFavourites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
                const { data } = await axios.post('https://63ff6846571200b7b7dd4135.mockapi.io/favourites', obj);
                setFavourites(prev => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты');
            console.error(error);
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.parentId) === Number(id))
    }

    return (
        <AppContext.Provider value={{ items, cartItems, favourites, isItemAdded, onAddToFavourite, setCartOpened, setCartItems, onAddToCart }}>
            <div className="wrapper clear">
            
            <Drawer 
                items={cartItems} 
                onClose={() => setCartOpened(false)} 
                onRemove={onRemoveItem}
                opened={cartOpened}
            />
            

            <Header onClickCart={() => setCartOpened(true)} />

            <Routes>
                <Route path='/' element={
                    <Home
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavourite={onAddToFavourite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}
                    />}>
                </Route>
            </Routes>

            <Routes>
                <Route path='/favourites' element={
                    <Favourites />}>
                </Route>
            </Routes>

            <Routes>
                <Route path='/orders' element={
                    <Orders />}>
                </Route>
            </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
