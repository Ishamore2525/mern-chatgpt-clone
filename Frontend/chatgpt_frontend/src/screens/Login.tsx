import {Center} from "../components/Center";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    async function loginUser(){

        try{
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    email,
                    password,
                }
            )

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Successful");

            setEmail("");
            setPassword("");

            navigate("/chat");

          
        }
        catch (error) {
            console.error(error);
            alert("Invalid Email or Password");
        }
    }

        
    

    return <div style= {{display:"flex", alignItems:"center", minHeight:"100vh", background: "black"}}>

        <div style={{width:"100%",display:"flex", justifyContent: "center" }}>

            <div style={{border:"1px solid white", borderRadius:10, padding:"100px 30px" }}>

            <Center>
                <div style={{fontSize:"50px", fontFamily:"intervariable, sans-serif", fontWeight: "600", alignItems: "center", margin: 10, color: "white"}}>Login</div>
            </Center>

            <Center>
                <div style={{fontSize:"15px", fontFamily:"intervariable, sans-serif", fontWeight: "400", alignItems: "center", margin: 10, color: "gray"}}>
                    Login with Chatgpt
                </div>
            </Center>
            
            <Center>
                <input type= "text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} style = {{padding: 10, borderRadius: 10, margin: 10, minWidth: 400, background: "black", border: "1px solid #888585", color: "white"}}/>
            </Center>

            <Center>
                <input type= "password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style = {{padding: 10, borderRadius: 10, margin: 10, minWidth: 400, background: "black", border: "1px solid #888585", color: "white"}}/>
            </Center>

            <Center>
                <button className= "button" onClick={loginUser} style = {{margin:10, padding: "5px 40px", fontSize: "14px", fontFamily: "intervariable, sans-serif"}}>Login</button>
            </Center>

            </div>

        </div>


        
    </div>
}