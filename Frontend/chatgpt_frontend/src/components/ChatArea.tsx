
import {useState, useEffect} from "react";
import {Chat} from "../screens/Chat";

interface ChatAreaProps {
  selectedChatId: string,
  setSelectedChatId: any,
  messages: any,

}

export function ChatArea(props: ChatAreaProps){

    return <div style={{minHeight:"75vh"}}>

        <div className= "scroll-container" style= {{maxHeight: "75vh",overflowY: "scroll", margin:20}}>
                    {props.messages.map((message, index) => (
                        <div key={index}
                            style={{
                                margin: "10px",
                                padding: "10px",
                                borderRadius: "10px",
                                background:
                                message.role === "user"
                                    ? "#c4c7c4"
                                    : "#000000",
                                color: message.role ==="user" ? "black": "white",
                                border: message.role === "user" ? "null" : "1px solid gray",
                            }}
                            >
                            {message.content}
                        </div>
                    ))}
                </div>

        

        
    </div>
}