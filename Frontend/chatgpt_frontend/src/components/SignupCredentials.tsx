
import {Center} from "./Center";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const api = axios.create({
        baseURL: "http://localhost:3000/api/auth",
        headers:{
            "Content-Type": "application/json",
        },
});

export function SignupCredentials(){

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const navigate = useNavigate();


    async function createuser(){

        try{

            await api.post("/signup", {username, email, password});
            setUserName("");
            setEmail("");
            setPassword("");
           
            alert("User created successfully!");

            navigate("/login");

        }
        catch(error){
            console.error("Error creating user:", error);
        }
    };

   



    return <div style ={{minHeight: "100vh", display: "flex", alignItems:"center", color:"#000000",background: "#54de9e"}}>


        <div style = {{width: "100%"}}>

            <Center>
                <div style ={{fontFamily: "Inter, sans-serif", fontSize: "50px", fontWeight: "600", padding: "20px", alignItems: "center"}}>
                    Create your account
                </div>
            </Center>

            <Center>
                <div style ={{fontFamily: "Inter, sans-serif", fontSize: "18px", fontWeight: "400"}}>
                    note that phone verification may be required for signup. Your number will
                </div>
            </Center>

            <Center>
                <div style ={{fontFamily: "Inter, sans-serif", fontSize: "18px", fontWeight: "400"}}>
                    only be used to verify your identity for security purposes.
                </div>
            </Center>

            <Center>
                <input placeholder="Name" type="text" value= {username}
              onChange={(e) => setUserName(e.target.value)} style = {{padding: 10, borderRadius: 10, margin: 10, minWidth: 400, background: "black", border: "1px solid #888585", color: "white"}}/>
            </Center>

            <Center>
                <input placeholder="Email" type="text"  value={email}
              onChange={(e) => setEmail(e.target.value)} style = {{padding: 10, borderRadius: 10, margin: 10, minWidth: 400, background: "black", border: "1px solid #888585", color: "white"}}/>
            </Center>

            <Center>
                <input placeholder="Password" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} style = {{padding: 10, borderRadius: 10, margin: 10, minWidth: 400, background: "black", border: "1px solid #888585", color: "white"}}/>
            </Center>

            <Center>
                <button className= "button" style = {{margin:10, padding: "5px 40px", fontSize: "14px", fontFamily: "intervariable, sans-serif"}} onClick= {createuser}>Sign Up</button>
            </Center>

        </div>


    </div>
}