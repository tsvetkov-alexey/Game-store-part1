import React from 'react';
import { useState, useEffect, useContext } from 'react';
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss';
import AppContext from '../../context';

const Card = ({ 
    id,
    title, 
    imageUrl, 
    price, 
    onFavourite, 
    onPlus, 
    favourited = false, 
    loading = false,
}) => {
    const { isItemAdded } = useContext(AppContext);
    const [isFavourite, setIsFavourite] = useState(favourited)
    const obj = { id, parentId: id, title, imageUrl, price };

    const onClickPlus = () => {
        onPlus(obj);
    }
    
    const onClickFavourite = () => {
        onFavourite(obj);
        setIsFavourite(!isFavourite);
    }

    return (
        <div className={styles.card}>
            {
                loading ? <ContentLoader 
                speed={2}
                width={160}
                height={210}
                viewBox="0 0 150 210"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"

            >
                <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
                <rect x="253" y="101" rx="0" ry="0" width="1" height="1" /> 
                <rect x="0" y="106" rx="5" ry="5" width="150" height="15" /> 
                <rect x="0" y="130" rx="5" ry="5" width="93" height="15" /> 
                <rect x="0" y="181" rx="8" ry="8" width="80" height="24" /> 
                <rect x="118" y="176" rx="8" ry="8" width="32" height="32" />
            </ContentLoader> :
                <>
                    {onFavourite && <div className={styles.favourite} onClick={onClickFavourite}>
                        
                    <img src={
                        isFavourite
                        ? '/img/liked.svg'
                        : '/img/unliked.png'
                    } alt='unliked' className={styles.like}/>
                    </div>}
                    <img width='100%' height={110} src={imageUrl} alt='Games' onClick={onClickFavourite} className={styles.game}></img>
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        {onPlus && <img 
                            className={styles.plus} 
                            onClick={onClickPlus} src={
                                isItemAdded(id)
                                ? '/img/btn-checked.svg'
                                : '/img/btn-plus.svg'
                            } alt='Plus'></img>}
                    </div>
                </>
            }
            
        </div>
    )
}

export default Card
