import {Columns2, NotebookPen, Trash2} from "lucide-react";
import {Button} from "./Button";
import axios from "axios";
import {useState, useEffect} from "react";
import { Navigate, useNavigate } from "react-router";

interface SideBarProps {
  selectedChatId: string,
  setSelectedChatId: any,
}

export function SideBar(props: SideBarProps){

     const [chats, setChats] = useState<any[]>([]);

     const navigate = useNavigate();

     async function getChats(){

        

        try {

            const token = localStorage.getItem("token");

            if(!token){
                    navigate("/login");
                }
            

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/sendmessage`,
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
            );

            setChats(response.data.chats);

           

        }
        catch (error) {

            console.error(error);
        }
        };

        useEffect(() =>{
            getChats();
        }, [])

        async function createEmptyChat(){


            try{

                const token = localStorage.getItem("token");

                
                console.log(token);

                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/sendmessage/emptychat`,
                {},
                {
                    headers:  {
                    Authorization: `Bearer ${token}`,
                    },
                })

                await getChats();

                console.log(response.data);

            }
            catch(error){
                console.log(error);
            }
        }

        async function deleteChat(chatId: String){

            try{

                const token = localStorage.getItem("token");

                await axios.delete(`${import.meta.env.VITE_API_URL}/api/sendmessage/${chatId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                );

                if (props.selectedChatId === chatId) {
                        props.setSelectedChatId("");
                }

                await getChats();
            }
            catch(error){
                console.error(error);
            }
        }
    

    return <div>
        
        <div style={{display: "flex", justifyContent: "space-between", padding: 15}}>
            
            <div>
                <img  height= "30"src = {"https://static.vecteezy.com/system/resources/previews/021/608/790/non_2x/chatgpt-logo-chat-gpt-icon-on-black-background-free-vector.jpg"}/>
            </div>

            <div>
                <Columns2 />
            </div>
        </div>

        <div>

            <div>
                 <Button  onClick= {createEmptyChat} leftIcon = {<NotebookPen />}>New Chat</Button>
            </div>

        </div>

        <div className= "scroll-container" style={{marginTop: 30,maxHeight: "80vh",overflowY: "scroll"}}>
            
        {/* {chats.map((chat) => (
            <div key= {chat._id} style ={{padding: 10, border: "1px solid gray", borderRadius: 5, margin: 5}}>
                {chat.title}
            </div> 
            
         ))} */}

         {chats.map((chat) => (
        <div className = "sidebardivs" style ={{padding: 10, border: "1px solid gray", borderRadius: 5, margin: 10, cursor:"pointer",  background:
                    props.selectedChatId === chat._id ? "#2c2b2b" : "transparent", display:"flex", justifyContent:"space-between"}}
            key={chat._id}
            onClick={() => props.setSelectedChatId(chat._id)}
  >
            {chat.title}
            <span onClick={() => deleteChat(chat._id)}style={{ cursor: "pointer"}}><Trash2 size ={15}/></span>
        </div>
        ))}
        </div>

    </div>
}