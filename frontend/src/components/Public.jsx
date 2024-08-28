import React from 'react'
import { Link } from 'react-router-dom'
import '../css/public.css'
import imageOne from '../images/clinic.jpg'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AccessibleIcon from '@mui/icons-material/Accessible';
import AdminPanelSettingsSharpIcon from '@mui/icons-material/AdminPanelSettingsSharp';
import AnimationIcon from '@mui/icons-material/Animation';

const Public = () => {
    const content = (
        <>
            <div className="container">
                <div className="header-container">
                    <div className="logo-name">
                        <MedicalInformationIcon fontSize='large' style={{ color: 'rgb(21, 9, 235)' }} />
                        <div className="name">
                            <h3>CLINIC MANAGEMENT</h3>
                        </div>
                    </div>

                    <div className="login">
                        <Link to='/login' className='login-button'><span className='login-font'>LOGIN</span></Link>
                    </div>

                </div>

                <div className="banner">
                    <div className="banner-description">
                      <div className="banner-description-container">
                        <div className="banner-description--greeting">
                            <EmojiPeopleIcon fontSize='large' style={{color: 'rgba(232, 144, 56, 1)'}} />
                            <p className='banner-description--greetingFont'>Welcome to Clinic Management System !</p>
                        </div>

                        <div className="banner-description--target">
                            <h1>For private <br/> clinics and <br/> medical centers</h1>
                        </div>

                        <div className="banner-description--paragraph">
                            <div className='banner-description--paragraphFont'>We aim to make the Clinic management system much more <br/> robust, efficient, flexible and easy to maintain.</div>  
                        </div>
                      </div>
                    </div>

                    <div className='banner-image'>
                        <img src={imageOne} alt="clinic image" className="banner-image-size" />
                    </div>
                </div>

                <div className="facility">
                    <div className="facility-container">
                        <div className="card">
                            <div className="card-logo">
                                <AccessibleIcon fontSize='inherit' className='card-logo-color' />
                            </div>
                            <div className="card-description">
                                <h3>Easy to find</h3>
                                <span className='card-description--simple'>The system makes it easy to find the records</span>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-logo">
                                <AdminPanelSettingsSharpIcon fontSize='inherit' className='card-logo-color' />
                            </div>
                            <div className="card-description">
                                <h3>Easy to maintain</h3>
                                <span className='card-description--simple'>The system makes it easy to maintain the records</span>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-logo">
                                <AnimationIcon fontSize='inherit' className='card-logo-color' />
                            </div>
                            <div className="card-description">
                                <h3>Minimal UI</h3>
                                <span className='card-description--simple'>The subtle UI provides better user experience</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    <div className="footer-container">
                        <h3>* To get started with the system, please login above </h3>
                    </div>
                </div>
            </div>
        </>
    )

    return content
}

export default Public