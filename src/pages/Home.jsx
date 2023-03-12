import React, {useContext} from 'react'
import Card from "../components/Card";

const Home = ({items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavourite,
    onAddToCart,
    isLoading
}) => {
    const renderItems = () => {
        const filtredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading 
            ? [...Array(12)] 
            : filtredItems
            ).map((item, index) => 
        <Card
            key={index} 
            onFavourite={(obj) => onAddToFavourite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
        />
    )
    }

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все игры'}</h1>
                <div className="search-block d-flex">
                    <img src='/img/search.svg' alt='Search'/>
                    {searchValue && <img className="clear cu-p" src='/img/btn-remove.svg' alt='Clear' onClick={() => setSearchValue('')}/>}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                </div>
            </div>
            
            <div className="sneakers d-flex flex-wrap">
                
                {renderItems()}
            </div>
        </div>
    )
}

export default Home
