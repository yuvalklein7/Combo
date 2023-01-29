import { useEffect } from "react";
import { useState } from "react";
import favSearches from "../../assets/FavSearches.json"
import FavoriteCard from "../../components/JS/FavoriteCard";
import '../CSS/Favorites.css'
export default function Favorites(props) {
    const [favItems, setFavItems] = useState([])
    useEffect(() => {
        setFavItems(favSearches.searches)
    }, [])
    return (
        <div className="favorite-searches-content">
            {favItems.map((value, key) => {
                return (
                    <div className="favorite-card-wrapper">
                        <FavoriteCard item={value} />
                    </div>)
            })}
        </div>
    )
}