import React from 'react';
import ReactDOM from 'react-dom';
import Category from './view/category'
import Expenses from './view/expenses';
import Home from './view/home';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import '../styles/main.scss'
import { Router, Route, Link, browserHistory, IndexRoute , hashHistory } from 'react-router'
import {Navbar,Nav,NavItem} from 'react-bootstrap'
import Constants from './common/constants'

class Index extends React.Component{

  constructor(){
    super()
    localStorage.setItem("categories",Constants.DEFAULT_CATEGORY)
    localStorage.setItem("expenses",[])
  }
  render(){

    let topNavigation = <Navbar inverse collapseOnSelect>
                          <Navbar.Header>
                            <Navbar.Brand>
                              <a href="#">Expense Tracker</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                          </Navbar.Header>
                          <Navbar.Collapse>
                            <Nav>
                                <a href="#/category">Category</a>                  
                                <a href="#/expense">Expense</a>                  
                            </Nav>                            
                          </Navbar.Collapse>
                        </Navbar>
    return(
    <div>
    {topNavigation}
    {this.props.children}

    </div>
  )
  }
  
}


ReactDOM.render(
  <Router history = {hashHistory}>    
      <Route path = "/" component = {Index}>      
         <Route path = "category" component = {Category} />
         <Route path = "expense" component = {Expenses} />
      </Route>
   </Router>,document.getElementById("container")
);




