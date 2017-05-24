import React, {Component } from 'react';
import Constants from '../common/constants';
import {DropdownButton, Table, Modal, OverlayTrigger, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
export default class Expenses extends Component
{
    constructor(props)
    {
        super(props);
       
        this.state={
             expenses:[],
             expenseAmount:"",
             showModal:false,
             expenseDate:moment(),
             categories:Constants.DEFAULT_CATEGORY
        }
        this.expenseCategory="";
    
        this.handleRadio=this.handleRadio.bind(this);
        this.handleDateChange=this.handleDateChange.bind(this);
        this.deleteExpense=this.deleteExpense.bind(this);
        this.updateExpense=this.updateExpense.bind(this);
        this.handleAmountChange=this.handleAmountChange.bind(this);
        this.addExpense=this.addExpense.bind(this);
        this.handleCategoryChange=this.handleCategoryChange.bind(this);
    }
   
    updateExpense()
    {
        let updateIndex=0;
        this.state.expenses.map((item, index)=>
        {
            if(item.checked==true)
            {
                updateIndex=index;
            }
        });

        let expenses=this.state.expenses;
        expenses[updateIndex].category=this.expenseCategory;
        expenses[updateIndex].amount=this.state.expenseAmount;
        expenses[updateIndex].date=this.state.expenseDate.toString();
        expenses[updateIndex].checked=false;
        this.setState({expenses, showModal:false});
    }

    deleteExpense()
    {
        let deleteIndex=0;
        this.state.expenses.map((item, index)=>
        {
            if(item.checked==true)
            {
                deleteIndex=index;
            }

        });

        let expenses=this.state.expenses;
        expenses.splice(deleteIndex,1);
        this.setState({expenses});
    }

    handleRadio(event)
    {
        let expenses=this.state.expenses;
        let checkedCategory="";
        let expenseDate=moment();
        let expenseAmount="";
        expenses.map((item, index)=>
        {
           // alert(item.category);
            if(index==event.target.id)
            {
                item.checked=true;
                item.selected=true;
                checkedCategory=item.category;
                expenseDate=new Date(item.date);
                expenseAmount=item.amount;
                alert(item.date)
               // alert("checked"+JSON.stringify(item))
            }
            else
            item.checked=false;
        })
      //  expenseDate=new Date(expenseDate)
        let categories=this.state.categories;
        categories.map((item)=>
        {
            if(item.name==checkedCategory)
            {
                item.selected=true
            }
            else
            item.selected=false
        })

        this.setState({expenses, categories, expenseDate, expenseAmount})
    }

    handleCategoryChange(event)
    {
     //   alert(event.target.value);

        this.expenseCategory=event.target.value;
        let categories=this.state.categories;
        categories.map((item, index)=>
        {
            if(item.name==event.target.value)
            {
                item.selected=true;
                alert("selected"+JSON.stringify(item))
            }
            else
            item.selected=false;
        }

        )

        this.setState({categories});
    }

    handleAmountChange(event)
    {     
      this.setState({expenseAmount:event.target.value});
    }

    addExpense()
    {
        let expenseEntry={};
        expenseEntry.category=this.expenseCategory;
        expenseEntry.amount=this.state.expenseAmount;
        expenseEntry.date=this.state.expenseDate.toString();
        expenseEntry.checked=false;
        
        let expenses=this.state.expenses;;
        expenses.push(expenseEntry);
        this.setState(expenses);
    }

    handleDateChange(date) 
    {
        this.setState({expenseDate: date});
    }

    render()
    {
          let dropdownItems=[];
       // let categories=Constants.DEFAULT_CATEGORY;
        this.state.categories.map((item, index)=>
        {
           if(index==0)
                this.expenseCategory=item.name;

            if(item.selected==true)
            {
                //alert("true"+JSON.stringify(item))
                dropdownItems.push (<option selected key={index}>{item.name}</option>); 
                this.expenseCategory=item.name;
            }
            
            else
                dropdownItems.push (<option key={index}>{item.name}</option>); 
        })


        let tableData=[];
        if(this.state.expenses.length<=0)
        {
            tableData.push(<tr><td colspan="3">No expenses Added</td></tr>)
        }
        else
        {
            let that=this;
            this.state.expenses.map((item, index)=>
            {
                tableData.push(<tr key={index}><td><input name="expenseRadio" type="radio" id={index} onChange={that.handleRadio}/>{item.category}</td><td>{item.amount}</td><td>{item.date}</td></tr>);
            })
        }
    
        let addUpdateCategory=(
            <div>
                <select onChange={this.handleCategoryChange}>
                    {dropdownItems}
                </select>
                <input type="number" name="expenseAmount" value={this.state.expenseAmount} onChange={this.handleAmountChange}/>
                <DatePicker selected={this.state.expenseDate} onChange={this.handleDateChange}/>
            </div>);

        return(
            <div>
               <header> Expenses Page</header>
                <section>
                    {addUpdateCategory}
                    <Button value="Add" onClick={this.addExpense}>Add</Button>
                </section>

                <section>
                   <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Expense</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </Table>
                </section>

                <Button onClick={()=>{this.setState({showModal:true})}}>Update</Button>
                <Button onClick={this.deleteExpense}>Delete</Button>
                
                <Modal show={this.state.showModal} onHide={()=>{this.setState({showModal:false})}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Expense Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {addUpdateCategory}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button  value="Update" onClick={this.updateExpense}>Update</Button>
                        <Button onClick={()=>{this.setState({showModal:false})}}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}