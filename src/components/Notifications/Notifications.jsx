import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow  } from '@material-ui/core';
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
                    <Table>
                        {/* <TableHead>
                            <TableRow>
                                <TableCell>
                                    You've got mail!
                                </TableCell>
                                <TableCell>
                                    accept this invite
                                </TableCell>
                                <TableCell>
                                    Decline this invite
                                </TableCell>
                            </TableRow>
                        </TableHead> */}
                        <TableBody>
                        {this.props.notifications.map(invite => (
                            <TableRow>
                                <TableCell>
                                    {invite.name}
                                </TableCell>
                                <TableCell>
                                    <IconButton className={this.props.classes.iconbuttonAccept} variant="outlined" size="small"
                                        onClick={() => this.handleAccept(invite.clubs_id)}>
                                        <CheckCircle /> Accept Invite
                        </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton className={this.props.classes.iconbuttonDecline} variant="outlined" size="small"
                                        onClick={() => this.handleDecline(invite.clubs_id)}>
                                        <Cancel />Decline Invite
                        </IconButton>
                                </TableCell>
                            </TableRow>
                ))}
                    </TableBody>
                </Table>

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