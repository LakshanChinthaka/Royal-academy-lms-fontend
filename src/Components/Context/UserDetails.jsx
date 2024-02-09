import React, { createContext } from 'react'

export const UserDetails = createContext();

function UserDetails() {
  return (
    <div>
        <UserDetails.Provider>

        </UserDetails.Provider>
    </div>
  )
}

export default UserDetails