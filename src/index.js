import React from 'react';
import ReactDOM from 'react-dom';
import Category from './view/category'
import Expenses from './view/expenses';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import '../styles/main.scss'





function Index(){
   localStorage.setItem("expenses",[1,2,3]);
    return(
      <div>
      <Category/>
      <Expenses/>
      </div>
    )
}


ReactDOM.render(
  <Index/>,document.getElementById("container")
);


