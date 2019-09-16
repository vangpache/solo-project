import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';


class UsernameSearch extends Component {

    state = {
        query:'',
        invited: []
    }

    getInfo = () => {
        this.props.dispatch({
            type: 'GET_USERNAMES',
            payload: this.state.query
        })
    }



    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                    this.getInfo()  
            }
        })
        console.log('in username search query:', this.state);
    }

    //ON CLICK --> TAKES THE USER IN THE REDUCER AND ADDS TO A STATE THAT WILL DISPATCH UPON CREATE NEW BUTTON TO A NEW REDUCER THAT COLLECTS ALL USERS INVITED
    //SPREAD STATEMENT NOT WORKING ATM, NEED TO LOOK AT AGAIN
    handleAddUser = () => {
        console.log('add user button clicked');
        this.setState ({
            invited: {
                user_id: this.props.users.id,
                username: this.props.users.username 
            }
        })
        this.props.dispatch({
            type: 'INVITE_USER', 
            payload: this.state.invited
        })
        console.log('invites list:', this.state.invited);
        console.log('user store:', this.props.users);
        
        
    }
    

    render () {


        return (
            <div>
                <h1>This is the search username piece</h1>
                <>
                    <input variant="filled" type="text" placeholder="invite users" 
                                ref={input => this.search = input}
                                onChange={this.handleInputChange} />
                    <h4>users show up here</h4>
                    {/* <p>{this.state.query}  */}
                    <p>{this.props.users.username}
                    <Button variant="outlined" onClick={this.handleAddUser}>Add user</Button>
                    </p>

                    <ul>
                        {this.props.inviteList.map(username => (
                        <li>
                            {username.username}
                            <Button>remove</Button>
                        </li>
                    ))}
                    </ul>
                    

                    {JSON.stringify(this.props.users)}
                    {JSON.stringify(this.props.inviteList)}
                    
                </>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        users: reduxStore.searchUsersReducer,
        inviteList: reduxStore.inviteUsersReducer
    }
}

export default connect(mapStateToProps) (UsernameSearch);