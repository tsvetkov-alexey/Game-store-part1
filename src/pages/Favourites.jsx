import React, { useContext } from 'react';
import Card from '../components/Card';
import AppContext from '../context';

const Favourites = () => {
const { favourites, onAddToFavourite } = useContext(AppContext);
  return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
            <h1>Мои закладки</h1>
        </div>
        
        <div className="sneakers d-flex flex-wrap">
            {favourites.map((item, index) => 
                <Card
                    key={index} 
                    favourited={true}
                    onFavourite={onAddToFavourite}
                    {...item}
            />
            )}
        </div>
    </div>
  )
}

export default Favourites
