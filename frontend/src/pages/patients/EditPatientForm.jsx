import React from 'react'
import { useState, useEffect } from "react"
import { useUpdatePatientMutation,useDeletePatientMutation } from './patientsApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import useAuth from '../../hooks/useAuth'

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const MOBILENUMBER_REGEX = /^[789][0-9]{9}$/

const EditPatientForm = ({ patient, users }) => {

  const { isDoctor, username } = useAuth()

  const [
    updatePatient, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useUpdatePatientMutation()


  const [deletePatient, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeletePatientMutation()

  const navigate = useNavigate()

  const [patientName, setPatientName] = useState(patient.patientName)
  const [pID, setPID] = useState(patient.pID)
  const [validPID, setValidPID] = useState(false)
  const pToken = patient.pToken
  const [address, setAddress] = useState(patient.address)
  const [mobileNumber, setMobileNumber] = useState(patient.mobileNumber)
  const [validMobileNumber, setValidMobileNumber] = useState(false)
  const [iserror, setIsError] = useState(false);
  const [deceaseRecordOne, setDeceaseRecordOne] = useState(patient.deceaseRecordOne)
  const [medicineRecordOne, setMedicineRecordOne] = useState(patient.medicineRecordOne)
  const [doctorID, setDoctorID] = useState(patient.doctorID)

  useEffect(() => {
    setValidPID(EMAIL_REGEX.test(pID))
  }, [pID])

  useEffect(() => {
    setValidMobileNumber(MOBILENUMBER_REGEX.test(mobileNumber))
  }, [mobileNumber])


  useEffect(() => {

      if (isSuccess || isDelSuccess) {
          setPatientName('')
          setAddress('')
          setMobileNumber('')
          setDeceaseRecordOne('')
          setMedicineRecordOne('')
          setDoctorID('')
          navigate('/dash/patients')
      }

  }, [isSuccess, isDelSuccess, navigate])

  const onPatientNameChanged = e => setPatientName(e.target.value)
  const onAddressChanged = e => setAddress(e.target.value)
  const onPatientPIDChanged = e => setPID(e.target.value)
  const onMobileNumberChanged = e => setMobileNumber(e.target.value)
  const onDeceaseRecordOneChanged = e => setDeceaseRecordOne(e.target.value)
  const onMedicineRecordOneChanged = e => setMedicineRecordOne(e.target.value)
  const onDoctorIDChanged = e => {
    const values = Array.from(
        e.target.selectedOptions,
        (option) => option.value
    )
    setDoctorID(values)
}

  const canSave = [ patientName, address, mobileNumber, deceaseRecordOne, medicineRecordOne ].every(Boolean) &&  !isLoading

  const onSavePatientClicked = async (e) => {
    if (canSave && validPID && validMobileNumber) {
        await updatePatient({ 
          id: patient.id,
          pToken,
          pID,
          patientName,
          address,
          mobileNumber,
          deceaseRecordOne,
          medicineRecordOne,
          doctorID
      })
      alert('Patient updated successfully')
    }
    else if(!validMobileNumber && ! validPID) {
      alert('Invalid Email ID and mobile number')
    }
    else if(!validMobileNumber) {
      alert('Invalid Mobile Number')
    }
    else if(!validPID) {
      alert('Invalid Email ID')
    }
    else {
      alert('Unable to update patient! please try again...')
    }
  }

  const onDeletePatientClicked = async () => {
      await deletePatient({ pToken: patient.pToken })
      alert('Patient data deleted successfully')
  }

  let filteredDoctors
  if(isDoctor) {
    filteredDoctors = users.filter(val => val.roles[0] === 'Doctor' && val.username === username)
  }
  else {
    filteredDoctors = users.filter(val => val.roles[0] === 'Doctor')
  }

  const options = filteredDoctors
                  .map(user => {
                      return (
                        <option
                          key={user.username}
                          value={user.username}
                      
                        > {user.username} </option>  
                      )
                  })


  const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

  const content = (
    <>
       <p className={errClass}>{errContent}</p>
        <div className='form-main'>
        <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>{patient.patientName} [ Token = {patient.pToken}]</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSavePatientClicked}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeletePatientClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>


                <div className="patient-details-first-row">
                  <div className='patient-details-first-row--first-column'>
                    <div><TextField
                        className='form__input--patient'
                        id="note-title"
                        name="title"
                        type="text"
                        label="Enter Patient Name"
                        autoComplete="on"
                        value={patientName}
                        onChange={onPatientNameChanged}
                    /></div>


                    <div><TextField
                        className='form__input--patient'
                        id="note-title"
                        name="title"
                        type="text"
                        label="Enter Patient Address"
                        autoComplete="on"
                        value={address}
                        onChange={onAddressChanged}
                    /></div>


                    <div><TextField
                        required
                        className='form__input--patient'
                        id="note-title"
                        name="title"
                        type="tel"
                        label="Enter Patient Mobile Number"
                        autoComplete="on"
                        error={iserror}
                        value={mobileNumber}
                        onChange={onMobileNumberChanged}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">
                             +91
                             </InputAdornment>,
                        }}
                    /></div>
                  </div>

                  <div className='patient-details-first-row--second-column'>

                  <div><TextField
                        className='form__input--patient'
                        id="note-title"
                        name="title"
                        type="text"
                        label= "Enter Email ID"
                        autoComplete="off"
                        value={pID}
                        onChange={onPatientPIDChanged}
                    /></div>

                    <div className="form__row">
                      <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="note-username">
                            ASSIGNED TO DOCTOR:</label>
                        <select
                            id="note-username"
                            name="username"
                            className="form__select"
                            value={doctorID}
                            onChange={onDoctorIDChanged}
                        >
                            {options}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='patient-details-second-row'>
                  <div className='patient-details-second-row--first-column'>
                    <label className="form__label form__label--second-row" htmlFor="note-text">
                        Decease Record:</label>
                    <div><textarea
                        className={`form__input form__input--text form__input--text-secondRow form__input--width`}
                        id="note-text"
                        name="text"
                        value={deceaseRecordOne}
                        onChange={onDeceaseRecordOneChanged}
                    /></div>
                    </div>

                    <div className='patient-details-second-row--second-column'>
                    <label className="form__label form__label--second-row" htmlFor="note-text">
                        Recommended medications:</label>
                    <div><textarea
                        className={`form__input form__input--text form__input--text-secondRow form__input--width`}
                        id="note-text"
                        name="text"
                        value={medicineRecordOne}
                        onChange={onMedicineRecordOneChanged}
                    /></div>
                    </div>
                </div>
        </form>
        </div>
    </>
  )

  return content
}

export default EditPatientForm