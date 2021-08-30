import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';

import { useSocket } from '../hooks/useSocket';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';


export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');

    const { auth } = useContext( AuthContext );
    const { usuariosConectados, recibirMensaje } = useContext(ChatContext);

    useEffect(() => {
        
        if(auth.logged) {
            conectarSocket();
        }

    }, [ auth, conectarSocket ]);

    useEffect(() => {
        
        if(!auth.logged) {
            desconectarSocket();
        }

    }, [ auth, desconectarSocket ]);

    // Escuchar los cambios en los clientes conectados
    useEffect(() => {

        socket?.on( 'lista-usuarios', usuarios => {
            
            usuariosConectados(usuarios);

        });

    }, [ socket, usuariosConectados ]);

    // Escucha los mensajes recibidos
    useEffect(() => {

        socket?.on( 'mensaje-personal', mensaje => {
            
            recibirMensaje(mensaje);

            scrollToBottomAnimated('messages');

        });

    }, [ socket, recibirMensaje ]);
    
    return (
        <SocketContext.Provider
            value={{
                socket,
                online
            }}
        >
            { children }
        </SocketContext.Provider>
    )
}