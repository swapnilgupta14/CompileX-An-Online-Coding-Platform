import { useEffect, useRef, useState, useCallback } from 'react';

const useWebSocket = <Req,Res>(url:string) => {
    const socket = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<Res>([]);

    useEffect(() => {
        socket.current = new WebSocket(process.env["NEXT_PUBLIC_BACKEND_URL"]+url);

        socket.current.onopen = () => {
            setIsConnected(true);
            console.log('WebSocket is open now.');
        };

        socket.current.onclose = () => {
            setIsConnected(false);
            console.log('WebSocket is closed now.');
        };

        socket.current.onmessage = (event:any) => {
            const data = JSON.parse(event.data) as Res;
            console.log('Received message', data);
            setMessages(data);
        };

        return () => {
            socket.current.close();
        };
    }, [url]);

    const sendMessage = useCallback((message : Req) => {
        if (isConnected && socket.current) {
            socket.current.send(JSON.stringify(message));
        }
    }, [isConnected]);

    return { isConnected, messages, sendMessage };
};

export default useWebSocket;
