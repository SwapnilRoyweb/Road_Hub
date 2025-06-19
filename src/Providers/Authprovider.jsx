import React, { Component, createContext } from 'react'
import app from '../Firebase/firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);

    const Authprovider = () => {

        return (
            <div>
              
            </div>
          )
    }

export default Authprovider;

