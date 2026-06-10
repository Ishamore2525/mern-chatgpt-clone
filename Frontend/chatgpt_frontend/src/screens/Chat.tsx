import {SideBar} from "../components/SideBar";
import {ChatArea} from "../components/ChatArea";
import {PromptBox} from "../components/PromptBox";
import {useState, useEffect} from "react";
import {Navbar} from "../components/Navbar";
import axios from 'axios';




export function Chat(){

    

    const [selectedChatId, setSelectedChatId] = useState("");
    const [messages, setMessages] = useState([]);


    
        

    //this will show selected chat id messages in chatWindow
    async function getChatById(chatId: string){

        try{
            const token = localStorage.getItem("token");


            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/sendmessage/${chatId}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            
            console.log(response.data.messages);


            setMessages(response.data.messages);

            
           
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {

        if(selectedChatId)
            getChatById(selectedChatId);

    }, [selectedChatId]);


    


    return <div style = {{display:"flex", background:"black" , minHeight: "100vh"}}>

        <div style= {{flex:2, borderRight:"1px solid #ccc", color:"white"}}>

            <SideBar selectedChatId = {selectedChatId}
                setSelectedChatId = {setSelectedChatId}
            />

        </div>

        <div style= {{flex:8, color:"white"}}>
            
            <Navbar/>
            
            <ChatArea selectedChatId = {selectedChatId}
                setSelectedChatId = {setSelectedChatId}
                messages = {messages}
                />
            
            <PromptBox
                selectedChatId = {selectedChatId}
                setSelectedChatId = {setSelectedChatId}
                message = {messages}
                getChatById = {getChatById}/>
        </div>



    </div>
}