import React from 'react';
import ReactDOM from 'react-dom';
import Category from './view/category'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import '../styles/main.scss'

function Index(){
    return(
      <Category/>
    )
}


ReactDOM.render(
  <Index/>,document.getElementById("container")
);


