import React from 'react'
import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice'
import { patientsApiSlice } from '../patients/patientsApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {

    useEffect(() => {
        console.log('subscribing')
        const patients = store.dispatch(patientsApiSlice.endpoints.getpatients.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getusers.initiate())

        return () => {
            console.log('unsubscribing')
            patients.unsubscribe()
            users.unsubscribe()
        }
    },[])

    return <Outlet />
}

export default Prefetch








