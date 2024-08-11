import { useEffect, useRef, useState, useCallback } from 'react';

const useWebSocket = <Req,Res>(url:string) => {
    const socket = useRef(null);
    const [isConnected, setIsConnected] = useState({status:false , at:Date.now()});
    const [messages, setMessages] = useState<Res>();
    const [sendData, setSendData] = useState<Req|"INITIAL">("INITIAL");

    useEffect(() => {
        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, []);

    const addListeners = () => {
        if (!socket.current) return;

        socket.current.onopen = () => {
            setIsConnected({
                status : true,
                at : Date.now()
            });
            console.log('WebSocket is open now.');
        };

        socket.current.onclose = () => {
            setIsConnected({
                status:  false,
                at : Date.now()
            });
            console.log('WebSocket is closed now.');
        };

        socket.current.onerror = (error) => {
            console.error('WebSocket encountered an error:', error);
        };

        socket.current.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data) as Res;
            console.log('Received message', data);
            setMessages(data);
        };
    };

    useEffect(() => {
        if(socket.current?.readyState && sendData!= "INITIAL"){
            console.log("SENDING")
            socket.current.send(JSON.stringify(sendData));
        }
        console.log(socket.current , sendData)
    }, [isConnected , sendData, socket.current]);

    const close = () =>{
        socket.current.close();
    }

    const sendMessage = async (message : Req , localUrl ?:string) => {
        if(localUrl)
            socket.current = new WebSocket(process.env["NEXT_PUBLIC_BACKEND_URL"] + localUrl );
        else
            socket.current = new WebSocket(process.env["NEXT_PUBLIC_BACKEND_URL"] + url);
        addListeners.call(this)
        setSendData(message)
    }

    return { isConnected, messages, sendMessage , close };
};

export default useWebSocket;
