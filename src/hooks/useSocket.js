import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';


export const useSocket = ( serverPath ) => {
    
    // useMemo solo volverá a calcular el valor memorizado cuando una de las dependencias haya cambiado. Esta optimización ayuda a evitar cálculos costosos en cada render.
    // const socket = useMemo(() => io.connect( serverPath, { transports: ['websocket'] } ), [ serverPath ] );

    const [ socket, setSocket ] = useState(null);
    const [ online, setOnline ] = useState(false);

    // useCallback devolverá una versión memorizada del callback que solo cambia si una de las dependencias ha cambiado
    const conectarSocket = useCallback( () => {

        const token = localStorage.getItem('token');

        const socketTemp = io.connect( serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true, // Cuando se llame esta instrucción se creará una nueva conexión
            query: { // Le paso el token al socket en el servidor
                'x-token': token
            }
        });

        setSocket(socketTemp);

    }, [ serverPath ]);

    const desconectarSocket = useCallback( () => {

        socket?.disconnect();

    }, [ socket ]);

    useEffect(() => {
        setOnline( socket?.connected );
    }, [ socket ])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}
