import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUserDoctor, faUserGear, faUser } from '@fortawesome/free-solid-svg-icons'
import patients from '../../images/patients.png'
import viewPatients from '../../images/viewPatients.png'
import doctors from '../../images/doctors.png'
import viewDoctors from '../../images/viewDoctors.png'
import userPanel from '../../images/userPanel.png'
import addUser from '../../images/addUser.png'
import '../../css/dashLayout.css'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    const { username, name, isManager, isAdmin, isReceptionist, isDoctor } = useAuth()
   
    const content = (
        <>

        <h1 style={{ marginTop: '-0.4em' }}>Welcome {name},</h1>
        <section className="welcome"> 
        <Link to="/dash/patients">
            <div className="welcome-container">
               <img src={viewPatients} alt="image not availbale" style={{width: '5em'}} className='logo--style' />
               <p className='welcome-container--description'><strong>View All Patients</strong></p>
            </div>
        </Link>

        { (isManager || isAdmin || isReceptionist) && 
        <Link to="/dash/patients/new">
            <div className="welcome-container">
               <img src={patients} alt="image not availbale" style={{width: '5em'}} className='logo--style' />
               <p className='welcome-container--description'><strong>Add New Patient</strong></p>
            </div>
        </Link> }

        { (isManager || isAdmin || isReceptionist) && 
        <Link to="/dash/doctors">
            <div className="welcome-container">
               <img src={viewDoctors} alt="image not availbale" style={{width: '5em'}} className='logo--style' />
               <p className='welcome-container--description'><strong>View All Doctors</strong></p>
            </div>
        </Link>}

        { (isManager || isAdmin || isReceptionist) &&        
        <Link to="/dash/doctors/new">
            <div className="welcome-container">
               <img src={doctors} alt="image not availbale" style={{width: '5em'}} className='logo--style' />
               <p className='welcome-container--description'><strong>Add New Doctor</strong></p>
            </div>
        </Link>}

        { (isManager || isAdmin) && 
        <Link to="/dash/users">
            <div className="welcome-container">
               {/* <FontAwesomeIcon icon={ faUserDoctor } style={{ fontSize: '4.2rem', color: '#fff' }} className='logo--style' /> */}
               <img src={userPanel} alt="image not availbale" style={{width: '6em'}} className='logo--style' />
               <p className='welcome-container--description'><strong>User panel</strong></p>
            </div>
        </Link> }


        { (isManager || isAdmin) && 
        <Link to="/dash/users/new">
            <div className="welcome-container">
               {/* <FontAwesomeIcon icon={ faUserGear } style={{ fontSize: '4.2rem', color: '#fff' }} className='logo--style' />  */}
               <img src={addUser} alt="image not availbale" style={{width: '6em'}} className='logo--style' />
               <p className='welcome-container--description'><strong>Add New user</strong></p>
            </div>
        </Link> }
        </section>

        </>
    )

    return content

}

export default Welcome