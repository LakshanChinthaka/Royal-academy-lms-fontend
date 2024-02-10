import React, { createContext, useState } from 'react';

export const AutheDetails = createContext();

function UserDetails() {
  return (
    <div>
        <AutheDetails.Provider>

        </AutheDetails.Provider>
    </div>
  )
}

export default UserDetails