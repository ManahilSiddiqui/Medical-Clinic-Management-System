import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import PatientsList from './features/patients/PatientsList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditPatient from './features/patients/EditPatient'
import NewPatient from './features/patients/NewPatient'
import DoctorsList from './features/users/DoctorsList';
import NewDoctorForm from './features/users/NewDoctorForm';
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        {/* Public Routes */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        
        {/* Protected routes */}
        <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path='dash' element={<DashLayout/>}>

                <Route index element={<Welcome />} />

                <Route path='patients'>
                  <Route index element={<PatientsList />} />
                  <Route path=':id' element={<EditPatient />} />
                  <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin, ROLES.Receptionist]} />}>
                    <Route path='new' element={<NewPatient />} />
                  </Route>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin, ROLES.Receptionist]} />}>
                  <Route path='users'>
                    <Route index element={<UsersList />} />
                    <Route path=':id' element={<EditUser />} />
                    <Route path='new' element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin, ROLES.Receptionist]} />}>
                  <Route path='doctors'>
                    <Route index element={<DoctorsList />} />
                    <Route path='new' element={<NewDoctorForm />} />
                  </Route>
                </Route>

              </Route> {/* End Dash */}
            </Route>
          </Route> {/* End of protected routes */}
        </Route> 

      </Route>
    </Routes>
  );
}

export default App;
