import { useEffect, useRef, useState, useCallback } from 'react';

const useWebSocket = <Req,Res>(url:string) => {
    const socket = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<Res>();

    const addListeners = (message:Req) =>{
        socket.current.onopen = () => {
            setIsConnected(true);
            console.log('WebSocket is open now.');
            setTimeout(()=>{
                socket.current.send(JSON.stringify(message));
            },200)
        };

        socket.current.onclose = () => {
            setIsConnected(false);
            console.log('WebSocket is closed now.');
        };

        socket.current.onerror = (error) => {
            console.error('WebSocket encountered an error:', error);
        };

        socket.current.onmessage = (event:any) => {
            const data = JSON.parse(event.data) as Res;
            console.log('Received message', data);
            setMessages(data);
            return false
        };
    }

    const close = () =>{
        socket.current.close();
    }

    const sendMessage = async (message : Req , localUrl ?:string) => {
        if(localUrl)
            socket.current = new WebSocket(process.env["NEXT_PUBLIC_BACKEND_URL"] + localUrl );
        else
            socket.current = new WebSocket(process.env["NEXT_PUBLIC_BACKEND_URL"] + url);

        addListeners(message)
    }

    return { isConnected, messages, sendMessage , close };
};

export default useWebSocket;
