import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({userId}) => {

  const user = useSelector(state => selectUserById(state, userId))

  const navigate = useNavigate()

  if(user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const userRolesString = user.roles.toString().replaceAll(',', ', ')

    return (
      <tr className="table__row Patient">
        <td className="table__cell">{user.name}</td>
        <td className="table__cell">{user.username}</td>
        <td className="table__cell">{userRolesString}</td>
        <td className="table__cell">
            <button
                className="icon-button table__button"
                onClick={handleEdit}
            >
            <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </td>
      </tr>
    )
      
  } else return null

}

export default User