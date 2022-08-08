import { useDispatch, useSelector } from "react-redux"
import calendarApi from '../api/calendarApi'
import { onChecking, onLogin, onLogout, clearMessage, onLogoutCalendar } from "../store"


export const useAuthStore = () => {

    const { status, user, errorMesage } = useSelector( state => state.auth )
    const dispatch = useDispatch()

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() )

        try {
            
            const { data } = await calendarApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime() ) // Por si queremos saber la fecha en la que se inició el token
            dispatch( onLogin({ name: data.name, uid: data.uid }) )

        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') )
            setTimeout( () => {
                dispatch( clearMessage() )
            },10)
        }
    }

    const startRegister = async({ name, email, password }) => {
        dispatch( onChecking() )

        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime() ) // Por si queremos saber la fecha en la que se inició el token
            dispatch( onLogin({ name: data.name, uid: data.uid }) )

        } catch (error) {
            dispatch( onLogout(error.response.data?.msg || 'Error al registrar') )
            setTimeout( () => {
                dispatch( clearMessage() )
            },10)
        }

    }

    // Funcion para renovar el token
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token')
        if( !token ) return dispatch( onLogout() )

        try {
            const { data } = await calendarApi.get('auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime() )
            dispatch( onLogin({ name: data.name, uid: data.uid }) )
        } catch (error) {
            localStorage.clear()
            dispatch( onLogout() )
        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch( onLogoutCalendar() )
        dispatch( onLogout() )
    }

    return {
        //* Propiedades
        status,
        user,
        errorMesage,
        //* Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}