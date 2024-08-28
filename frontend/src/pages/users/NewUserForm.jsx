import React from 'react'
import { useState, useEffect } from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'
import { ROLES } from '../../config/roles'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const USER_REGEX = /^[A-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const MOBILENUMBER_REGEX = /^[789][0-9]{9}$/

const NewUserForm = () => {

  const { isManager, isAdmin, isDoctor, isReceptionist } = useAuth()

  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [validMobileNumber, setValidMobileNumber] = useState(false)
  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [reEnterPassword, setReEnterPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(["Employee"])
  const [iserror, setIsError] = useState(false);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
      setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidMobileNumber(MOBILENUMBER_REGEX.test(mobileNumber))
  }, [mobileNumber])

  useEffect(() => {
      setValidPassword(PWD_REGEX.test(values.password))
  }, [values.password])

  useEffect(() => {
      if (isSuccess) {
          setName('')
          setMobileNumber('')
          setUsername('')
          setPassword('')
          setReEnterPassword('')
          setRoles([])

          if(roles[0] === 'Doctor') 
            navigate('/dash/doctors')
          else 
            navigate('/dash/users')     
      }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onMobileNumberChanged = e => setMobileNumber(e.target.value)
  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const onReEnterPassword = e => setReEnterPassword(e.target.value)
  const onRolesChanged = e => {
    const values = Array.from(
          e.target.selectedOptions,
          (option) => option.value
      )
    setRoles(values)
  }

  const canSave = [name, mobileNumber, username, values.password, roles.length].every(Boolean) && !isLoading

  const onSaveUserClicked = async (e) => {
      e.preventDefault()
      if (canSave && validUsername && validPassword && validMobileNumber && (values.password === reEnterPassword)) {
        await addNewUser({ name, mobileNumber, username, password: values.password, roles })
        alert('New User created successfully')
      }
      else if(!validUsername && !validPassword && !validMobileNumber && !(values.password === reEnterPassword)) {
        alert('All fields are invalid')
      }
      else if(!validUsername) {
        alert('Invalid username')
      }
      else if(!validPassword) {
        alert('Invalid password')
      }
      else if(!validMobileNumber) {
        alert('Invalid mobile number')
      }
      else if(!(values.password === reEnterPassword)) {
        alert('Please re-enter password correctly')
      }
      else {
        alert('Unable to create new User! please try again...')
      }
  }

  let optionsTwo
  if(isManager) {
      optionsTwo = Object.values(ROLES).map(role => {
          return (
                <option
                    key={role}
                    value={role}
          
                > {role}</option >
          )
      })
      console.log(isManager)
  }

  if(isAdmin) {
      optionsTwo = Object.values(ROLES).filter(val => val !== 'Manager' && val !== 'Admin').map(role => {
          return (
                <option
                    key={role}
                    value={role}
      
                > {role}</option >
          )
      })
  }

  if(isReceptionist) {
    optionsTwo = Object.values(ROLES).filter(val => val === 'Doctor').map(role => {
        return (
              <option
                  key={role}
                  value={role}
    
              > {role}</option >
        )
    })
  }

  const errClass = isError ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


  const content = (
      <>
          <p className={errClass}>{error?.data?.message}</p>

          <form className="form" onSubmit={onSaveUserClicked}>
              <div className="form__title-row">
                  <h2>Add New User</h2>
                  <div className="form__action-buttons">
                      <button
                          className="icon-button"
                          title="Save"
                          disabled={!canSave}
                      >
                          <FontAwesomeIcon icon={faSave} />
                      </button>
                  </div>
              </div>

              <TextField
                  className={`form__input`}
                  id="name"
                  name="name"
                  type="text"
                  label="Enter Name"
                  autoComplete="on"
                  value={name}
                  onChange={onNameChanged}
              />


              <TextField
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
              />


              <TextField
                  className={`form__input`}
                  id="username"
                  name="username"
                  type="text"
                  label="Enter username"
                  autoComplete="on"
                  value={username}
                  onChange={onUsernameChanged}
              />


              <TextField
                  className={`form__input`}
                  id="password"
                  name="password"
                  label=" Enter password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handlePasswordChange("password")}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                       </InputAdornment>
                  }}
              />

              <TextField
                  className={`form__input`}
                  id="ReEnterPassword"
                  name="ReEnterPassword"
                  type="password"
                  label="Re-Enter password"
                  value={reEnterPassword}
                  onChange={onReEnterPassword}
              />

              <label className="form__label" htmlFor="roles">
                  ASSIGNED ROLES:</label>
              <select
                  id="roles"
                  name="roles"
                  className={`form__select ${validRolesClass}`}
                  multiple={true}
                  size="3"
                  value={roles}
                  onChange={onRolesChanged}
              >
                  {optionsTwo}
              </select>

          </form>
      </>
  )

  return content

}

export default NewUserForm