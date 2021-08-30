import React, { createContext, useReducer, useCallback} from 'react';

import { chatReducer } from './chatReducer';
import { types } from '../../types/types';

export const ChatContext = createContext();

const initialState = {
    uid: '',
    chatActivo: null, // UID del usuario al que quiero enviar mensajes
    usuarios: [],
    mensajes: [] // Chat seleccionado
}


export const ChatProvider = ({ children }) => {

    const [ chatState, dispatch ] = useReducer( chatReducer, initialState );

    // Añade los usuarios que están en linea
    const usuariosConectados = usuarios => {

        dispatch({
            type: types.usuariosCargados,
            payload: usuarios
        })

    }

    // Abre el chat de un usuario
    const asignarChat = uid => {
        
        dispatch({
            type: types.activarChat,
            payload: uid
        });

    }

    // Recibir mensajes
    const recibirMensaje = useCallback( mensaje => {

        dispatch({
            type: types.nuevoMensaje,
            payload: mensaje
        })

    }, []);

    // Cargar todos los mensajes del chat
    const cargarMensajes = chat => {

        dispatch({
            type: types.cargarMensajes,
            payload: chat
        });

    }

    // Elimina los chats de la ultima sesión al cerrarla
    const limpiarState = () => {

        dispatch({
            type: types.cerrarSesion
        });

    }

    return(
        <ChatContext.Provider
            value={{
                chatState,
                usuariosConectados,
                asignarChat,
                recibirMensaje,
                cargarMensajes,
                limpiarState
            }}
        >
            { children }
        </ChatContext.Provider>
    );
}