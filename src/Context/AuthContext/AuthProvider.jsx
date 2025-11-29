
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../../Firebase/Firebase.init';
import { useEffect, useState } from 'react';

const googoleprovider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {

    const [user, setuser] = useState(null)
    const [loadding, setloadding] = useState(true)


    const registeruser = (email, password) => {
        setloadding(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const siginInUser = (email, password) => {
        setloadding(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googlesignin = () => {
        setloadding(true)
        return signInWithPopup(auth, googoleprovider)
    }
 

    const logOut = () => {

        return signOut(auth)
    }

    const updateprofileuser = data => {

        return updateProfile(auth.currentUser, data)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser )=> {
            setuser(currentuser)
            setloadding(false)
        })
        
        return () => {
            unsubscribe()
        }
    },[])

    const authinfo = {
        user,
        loadding,
        registeruser,
        siginInUser,
        googlesignin,
        logOut,
        updateprofileuser

    }
    return (
        <AuthContext value={authinfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;