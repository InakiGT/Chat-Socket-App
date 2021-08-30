import  React, { createContext, useState, useCallback } from "react";

import { fetchConToken, fetchSinToken  } from '../helpers/fetch';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
};

const AuthProvider = ({ children }) => {

    // State del Context
    const [ auth, setAuth ] = useState(initialState);

    // Inicio de Sesión
    const login = async ( email, password ) => {

        const resp = await fetchSinToken( 'login', { email, password }, 'POST' );

        if( resp.ok ) {

            localStorage.setItem( 'token', resp.token );

            const { usuario } = resp;

            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            });

        }

        return resp.ok;

    }

    // Crea una cuenta
    const register = async ( name, email, password ) => {

        const resp = await fetchSinToken( 'login/new', { nombre: name, email, password }, 'POST');

        if( resp.ok ) {

            localStorage.setItem( 'token', resp.token );

            const { usuario } = resp;

            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            });
            
            return true;

        }

        return resp.msg;

    }

    // Valida un Token - useCallback porque se ejecuta varias veces en un useEffect
    const verificaToken = useCallback( async () => {

        const token = localStorage.getItem('token');

        if( !token ) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            });

            return false;
        }

        const resp = await fetchConToken('login/renew');

        if( resp.ok ) {

            localStorage.setItem( 'token', resp.token );
            const { usuario } = resp;

            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            });

            return true;

        } else {

            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            });

            return false;

        }

    }, []);

    // Cierra una sesión
    const logout = () => {

        localStorage.removeItem('token');

        setAuth({
            checking: false,
            logged: false
        });

    }
    
    return (
        <AuthContext.Provider
            value={{
                login,
                register,
                verificaToken,
                logout,
                auth
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}
 
export default AuthProvider;