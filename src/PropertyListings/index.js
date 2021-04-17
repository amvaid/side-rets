import { useState, useEffect } from 'react';

import heartFull from '../assets/heart-fill.svg'
import heartStroke from '../assets/heart-stroke.svg'

import './styles.css';

function PropertyListings() {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });
      
    const [properties, setProperties] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [favoriteListings, setFavoriteListings] = useState({});

    useEffect(() => {
        const propertyListings = localStorage.getItem('property-listings');
        if(!propertyListings) {
            setIsLoading(true);
            const headers = new Headers();
            const authString = 'simplyrets:simplyrets'
            headers.set('Authorization', 'Basic ' + btoa(authString))

            fetch('https://api.simplyrets.com/properties', {
                    method: 'GET',
                    headers
            })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                setProperties(data);
                localStorage.setItem('property-listings', JSON.stringify(data));
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error)
            });

        } else {
            setIsLoading(false)
            setProperties(JSON.parse(propertyListings));
        }
    }, [isLoading]);

    useEffect(() => {
        const favoritedListings = JSON.parse(localStorage.getItem('favorite-listings')) || {};
        setFavoriteListings(favoritedListings)
    })

    function handleOnFavoriteClick(mlsId) {
        const favoritedListings = JSON.parse(localStorage.getItem('favorite-listings')) || {};
        if(favoritedListings[mlsId]){
            delete favoritedListings[mlsId];
        } else {
            favoritedListings[mlsId] = true;
        }

        localStorage.setItem('favorite-listings', JSON.stringify(favoritedListings));
    }


    return (
        <div className="container">
            {isLoading 
            ? <p>Loading...</p> 
            : (<div className="content-container">
                {properties.map(({mlsId, photos, property: { area, bathsFull, bathsHalf, bedrooms }, listPrice, address: { full }, listDate}, idx) => {
                    const baths = bathsFull + (bathsHalf * .5);
                    const date = new Date(listDate);
                    const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().substring(2, 4)}`
                    
                    return (<div key={idx} className="listing">
                        <div className="image-container">
                            <img alt="property-listing" src={photos[0]} className="image"/>
                            <button className="heart" onClick={() => handleOnFavoriteClick(mlsId)}>
                            {favoriteListings[mlsId] ? 
                                 <img src={heartFull} alt="favorite"/> : <img src={heartStroke} alt="favorite"/>
                            }
                            </button>
                        </div>
                        <div>
                            <p className="property-details">{bedrooms} BR | {baths} Bath | {area} Sq Ft</p>
                            <p className="price">{formatter.format(listPrice)}</p>
                            <p className="address">{full}</p>
                            <p className="list-date">Listed: {dateString}</p>
                        </div>
                    </div>)
                })}
            </div>)}
        </div>
    )
}

export default PropertyListings;