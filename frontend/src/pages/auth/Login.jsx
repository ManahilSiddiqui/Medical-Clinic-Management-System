import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import CircularLoaderWithLabel from '../../pageLoader/CircularLoaderWithLabel'
import '../../css/userList.css'

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!document.getElementById('persist').checked) {
        alert("please check 'Trust this device'")
        navigate('/login')
    }
    else {
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = (e) => setPersist(prev => !prev)

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return (
    <CircularLoaderWithLabel />
  )

  const content = (
    <div className="public">
        <header>
            <h1>User Login</h1>
        </header>
        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
        {/* { alert(`${errMsg}`) } */}
        <main className="login">

            <form className="form--login" onSubmit={handleSubmit}>
                <label htmlFor="username"><strong>Username:</strong></label>
                <input
                    className="form__input"
                    type="text"
                    id="username"
                    ref={userRef}
                    value={username}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password"><strong>Password:</strong></label>
                <input
                    className="form__input"
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={password}
                    required
                />

                <label htmlFor="persist" className="form__persist">
                <input
                    className="form__checkbox"
                    type="checkbox"
                    id="persist"
                    onChange={handleToggle}
                    value={persist}
                />
                Trust this device
                </label>

                <button className="form__submit-button">Sign In</button>

            </form>
        </main>
        <footer>
            <Link to="/"><strong>Back to Home</strong></Link>
        </footer>
  </div>
)

return content

}

export default Login