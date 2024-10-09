import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext'

export default function Logout() {
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        setUser({ id: null });
    }, [])

    return (
        <Navigate to='/login' />
    )
}