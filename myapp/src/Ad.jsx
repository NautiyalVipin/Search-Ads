import React from 'react'

const Ad = (props) => {
  return (
    <div className="cards">
    <div className="card" key={props.id}>
        <img src={props.imageUrl} alt="Image" className="card_img" />
        <div className="card_info">
        <h3 className="card_title">{props.headline}</h3>
            <span className="card_category">{props.primaryText}</span>
            
            
        </div>
        <div className='card_button'>
        <a href={props.url} target="_blank">
                <button >{props.CTA?.slice(0,10)}</button>
            </a>
            </div>
    </div>

</div>
  )
}

export default Ad