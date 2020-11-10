import React, {useState} from 'react'

const SetRating = ({whenClicked}) => {
    const total = [0,1,2,3,4,5]
    const [numStar, setNumStar] = useState(0)
    const [rating, setRating] = useState(0)
    const hoverHandler = num => setNumStar(num)
    const ratingHandler = () => {
        setRating(numStar)
        whenClicked(numStar)
    }
    return (
        <span onMouseLeave={() => setNumStar(rating)}>
            {
            total.map(
                (n, i) => 
                <span  onMouseEnter={() => hoverHandler(n)}
                    onClick={() => ratingHandler()}
                    key={i}
                    className={(n!==0) ? (n>numStar?'far fa-star':'fas fa-star') : ''} 
                    style={{color:'black', cursor: 'pointer', margin: '2px'}}
                >
                    {n===0 && <strong>{numStar}</strong>}
                </span>
                )
            }
        </span>
    )
}

export default SetRating
