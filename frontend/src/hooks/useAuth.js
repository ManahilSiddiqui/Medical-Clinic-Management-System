import React from 'react'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'
import { useSelector } from 'react-redux'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let isDoctor = false
    let isReceptionist = false
    let status = "Receptionist"
    
    if(token) {
        const decoded = jwtDecode(token)
        const { username, name, roles } = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')
        isDoctor = roles.includes('Doctor')
        isReceptionist = roles.includes('Receptionist')

        if(isManager) status = "Manager"
        if(isAdmin) status = "Admin"
        if(isDoctor) status = "Doctor"
        if(isReceptionist) status = "Receptionist"

        return { username, name, roles, isManager, isAdmin, isDoctor, isReceptionist, status }
    }
    
    return { username: '' , name: '', roles: [], isManager, isAdmin, isDoctor, isReceptionist, status }
}

export default useAuth