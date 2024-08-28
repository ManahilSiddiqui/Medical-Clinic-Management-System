import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import useAuth from '../hooks/useAuth'

const DashFooter = () => {

    const { username, name, status } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <footer className="dash-footer">
            <div className="dash-footer-left">
                <h3>Current User : <span style={{ color: 'red' }}>{username}</span></h3>
                <h3>Status : <span style={{ color: 'red' }}>{status}</span></h3>
            </div>

            <div className="dash-footer-right">
                <FontAwesomeIcon icon= {faCalendarDays} style={{marginTop: '0.1em'}} />
                <p className='dash-footer-right--time'> <h4> {today} </h4> </p>
            </div>
        </footer>
    )

    return content
}

export default DashFooter