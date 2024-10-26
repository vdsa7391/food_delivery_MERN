import React from 'react'
import '../components/foodDisplay/foodDisplay.css'

function details(props){
    const description= props.item.description
    if(description){
        return (
            <div className="details">
                             <div className="titleplusprice">
                             <h3 className='title' >{props.item.title}</h3>
                             <h3 className="price" style={{fontWeight:"600"}}>{props.item.price} €</h3>
                            </div>
                            <p className='item_description'>{props.item.description}</p>
                            </div>
        )  
    }else{
        return(
            <div className="details" >
                             <div className="titleplusprice">
                             <h3 className='title' >{props.item.title}</h3>
                             <h3 className="price" style={{fontWeight:"600"}}>{props.item.price} €</h3>
                            </div>
                            </div>

        );
    }
 
}
export default details