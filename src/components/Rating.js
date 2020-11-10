import React from 'react'
import PropTypes from 'prop-types'

const maxRating = 5;


const Rating = ({value, text, color}) => {

    const Icon = ({cn}) => <i className={cn} style={{color}}></i>

    const rating = []
    rating.length = maxRating
    rating.fill(undefined)

    return (
        <span className='rating'>
            {
                rating.map((v,i) => {

                    if(i<=(value -1)){
                        return <Icon key={i} cn="fas fa-star"/>
                    }else{
                        if( (i === Math.round(value-1))
                             && 
                             (Math.round(value) !== value)
                        ) return <Icon key={i} cn="fas fa-star-half-alt"/>
                        return <Icon key={i} cn="far fa-star"/>
                    }

                }  
                )
            }
            <span>{text && text}</span>
        </span>
    )
}

Rating.defaultProps = {
    color: 'grey'
}

Rating.propTypes={
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
}

export default Rating
