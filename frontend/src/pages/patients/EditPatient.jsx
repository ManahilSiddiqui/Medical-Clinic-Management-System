import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPatientById } from './patientsApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditPatientForm from './EditPatientForm'
import CircularLoader from '../../pageLoader/CircularLoader'

const EditPatient = () => {

  const { id } = useParams()

  const patient = useSelector(state => selectPatientById(state, id))
  const users = useSelector(selectAllUsers)

  console.log('users', users)

  const content = users.length && patient ? <EditPatientForm patient={patient} users={users} /> : <CircularLoader />
  
  return content
}

export default EditPatient