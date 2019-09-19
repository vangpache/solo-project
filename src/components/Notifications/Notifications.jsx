import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, IconButton } from '@material-ui/core';
import { MailOutline, Cancel, CheckCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

const styles = {
    iconbuttonAccept: {
        margin: '15px',
        fontSize: '1em',
        color: 'green',
        background: 'white'
    },
    iconbuttonDecline: {
        margin: '15px',
        fontSize: '1em',
        color: 'red'
    },

}

class Notifications extends Component {


    handleAccept = (id) => {
        this.props.dispatch({
            type: 'ACCEPT_INVITE',
            payload: id,
        })
    }

    handleDecline = (id) => {
        this.props.dispatch({
            type: 'DELETE_INVITE',
            payload: id
        })
    }

    render () {

        console.log('in notifications, club id is:', this.props.notifications.id);
        

        return (
            <>
                <h4>Notifications <MailOutline /></h4>
            <ul>
                {this.props.notifications.map(invite => (
                    <li> {invite.name}

                        <IconButton className={this.props.classes.iconbuttonAccept} variant="outlined" size="small" 
                                onClick={() => this.handleAccept(invite.clubs_id)}>
                            <CheckCircle /> Accept Invite
                        </IconButton>

                        <IconButton className={this.props.classes.iconbuttonDecline} variant="outlined" size="small" 
                                onClick={() => this.handleDecline(invite.clubs_id)}>
                                    <Cancel/>Decline Invite
                        </IconButton>
                        {/* {JSON.stringify(invite.clubs_id)} */}
                    </li>
                ))}

            </ul>
            </>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        notifications: reduxStore.notificationsReducer
    }
}

export default withStyles (styles) (connect(mapStateToProps) (Notifications));