import {useState, useEffect} from "react";
import {Send} from "lucide-react";
import axios from "axios";


interface ChatAreaProps {
  selectedChatId: string,
  setSelectedChatId: any,
  message: any,
  getChatById: any,

}

export function PromptBox(props: ChatAreaProps){

    const [input, setInput] = useState("");

    async function sendMessage(){

        

        try{
                const token = localStorage.getItem("token");

                

                console.log(props.selectedChatId);

                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/${props.selectedChatId}/message`,
                    {
                        message: input,
                    },
                    {
                        headers: {
                        Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setInput("");

                await props.getChatById(props.selectedChatId);
                
        }
        catch(error){
            console.error(error);
        }

        
        

    }

    return <div style={{minHeight: "7vh", display: "flex", alignItems:"end"}}>

        <div style= {{width:"100%"}}>

        <div style={{ display:"flex", justifyContent:"center"}}>

            <div style={{display: "flex", justifyContent:"space-evenly"}}>

                <div style={{display:"flex", alignItems:"center"}}>
                    <input type="text" value={input} onChange = {(e) => setInput(e.target.value)} placeholder="Type a message..." style = {{padding: 10, borderRadius: 10, margin: 10, minWidth: 500, background: "black", border: "1px solid #888585", color: "white"}}/>

                    <button onClick= {sendMessage} style={{borderRadius:"50%", background:"black", color:"white",marginTop:"8px", border: "none"}}><Send /></button>
                </div>

               
                

            </div>

        </div>

        </div>
    </div>
}