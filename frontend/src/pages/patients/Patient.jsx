import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faStreetView } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPatientById } from './patientsApiSlice'


const Patient = ({patientID}) => {

  const patient = useSelector(state => selectPatientById(state, patientID))

  const navigate = useNavigate()

  if(patient) {

    const handleEdit = () => navigate(`/dash/patients/${patientID}`)

    const deceaseRecordOne = patient.deceaseRecordOne
    const medicineRecordOne = patient.medicineRecordOne
    const deceaseRecordTwo = patient.deceaseRecordTwo
    const medicineRecordTwo = patient.medicineRecordTwo
    const doctorID = patient.doctorID
    
    return (
      <tr className="table__row">
        <td className="table__cell">{patient.pToken}</td>
        <td className="table__cell">{patient.patientName}</td>
        <td className="table__cell">{patient.address}</td>
        <td className="table__cell">{patient.mobileNumber}</td>
        <td className="table__cell">
          <button
              className="icon-button table__button"
              onClick={handleEdit}
          >
              <FontAwesomeIcon icon={faStreetView} />
          </button>
        </td>
      </tr>
    )
  } else return null

}

export default Patient
