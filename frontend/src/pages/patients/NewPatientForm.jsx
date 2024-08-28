import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewPatientMutation } from './patientsApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const MOBILENUMBER_REGEX = /^[789][0-9]{9}$/

const NewPatientForm = ({users}) => {

  const [addNewPatient, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewPatientMutation()

  const navigate = useNavigate()

  const [patientName, setPatientName] = useState('')
  const [pID, setPID] = useState('')
  const [validPID, setValidPID] = useState(false)
  const [address, setAddress] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [validMobileNumber, setValidMobileNumber] = useState(false)
  const [iserror, setIsError] = useState(false);
  const [deceaseRecordOne, setDeceaseRecordOne] = useState('')
  const [medicineRecordOne, setMedicineRecordOne] = useState('')
  const [doctorID, setDoctorID] = useState(["Kunal"])

  useEffect(() => {
    setValidPID(EMAIL_REGEX.test(pID))
  }, [pID])

  useEffect(() => {
    setValidMobileNumber(MOBILENUMBER_REGEX.test(mobileNumber))
  }, [mobileNumber])

  useEffect(() => {
      if (isSuccess) {
          setPatientName('')
          setPID('')
          setAddress('')
          setMobileNumber('')
          setDeceaseRecordOne('')
          setMedicineRecordOne('')
          setDoctorID('')
          navigate('/dash/patients')
      }

  }, [isSuccess, navigate])

  const onPatientNameChanged = e => setPatientName(e.target.value)
  const onPatientPIDChanged = e => setPID(e.target.value)
  const onAddressChanged = e => setAddress(e.target.value)
  const onMobileNumberChanged = e => {
    setMobileNumber(e.target.value)
    if(e.target.value.length > 10) setIsError(true)
  }
  const onDeceaseRecordOneChanged = e => setDeceaseRecordOne(e.target.value)
  const onMedicineRecordOneChanged = e => setMedicineRecordOne(e.target.value)
  // const onDoctorIDChanged = e => setDoctorID(e.target.value)
  const onDoctorIDChanged = e => {
    const values = Array.from(
        e.target.selectedOptions, //HTMLCollection 
        (option) => option.value
    )
    setDoctorID(values)
  }
  
  const canSave = [ patientName, pID, address, mobileNumber, deceaseRecordOne, medicineRecordOne, doctorID ].every(Boolean) &&  !isLoading

  const onSavePatientClicked = async (e) => {
    e.preventDefault()
    if (canSave && validPID && validMobileNumber ) {
        await addNewPatient({ 
          pID,
          patientName,
          address,
          mobileNumber,
          deceaseRecordOne,
          medicineRecordOne,
          doctorID
      })
      alert('New patient created successfully')
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
      alert('Unable to create new patient! please try again...')
    }
  }


  const options = users.filter(val => val.roles[0] === 'Doctor')
                  .map(user => {
                      return (
                        <option
                          key={user.username}
                          value={user.username}
                      
                        > {user.username} </option>  
                      )
                  })


  const errClass = (isError) ? "errmsg" : "offscreen"
  const errContent = (error?.data?.message) ?? ''
  
  const content = (
    <>
      <p className={errClass}>{errContent}</p>
        <div>
          <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Add New Patient</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSavePatientClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
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
                        autoComplete="off"
                        value={patientName}
                        onChange={onPatientNameChanged}
                    /></div>


                    <div><TextField
                        className='form__input--patient'
                        id="note-title"
                        name="title"
                        type="text"
                        label="Enter Patient Address"
                        autoComplete="off"
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
                        autoComplete="off"
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

export default NewPatientForm