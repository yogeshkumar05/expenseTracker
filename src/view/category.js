import React from 'react'
import Constants from '../common/constants'

export default class Category extends React.Component {

    constructor() {
        super()

        this.state = {
            categories: Constants.DEFAULT_CATEGORY
        }
    }

    checkboxHandler(event) {
        alert("Inside checkboc handler event.name = "+event.target.getAttribute('name'))
        
    }

    render() {
        let category_list = [];
        let that= this
        this.state.categories.map(function (item,index) {
            category_list.push(<li key={index}><input type="checkbox" value={item.name} checked={item.checked} name={item.name} onChange={that.checkboxHandler.bind(that)}/>{item.name}</li>)
        })
        return (
            <div className="category-container">
                Inside category view
                <ul>
                    {category_list}

                </ul>

            </div>
        )
    }
}