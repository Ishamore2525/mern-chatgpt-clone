import { useNavigate } from "react-router-dom";

export function Navbar(){

    const navigate = useNavigate();


        const logout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/login", { replace: true });
        };

    return <div style={{display:"flex", justifyContent:"space-between", padding: 10, border:"1px solid gray", margin:20, borderRadius:40}}>

            <div style={{fontFamily:"OpenAI Sans, sans-serif", font:"18px", fontWeight:600, display:"flex", alignItems:"center", marginLeft:5}}>

                Chatgpt

            </div>

            <div>

                <button onClick={() => navigate("/login")} style={{margin: "0px 5px ",padding: "5px 15px",borderRadius: 20, border: "1px solid gray", background:"black", color:"white", fontFamily:"OpenAI Sans, sans-serif", fontSize: 15, cursor:"pointer"}}>
                    Login
                </button>
 
                <button onClick={() => navigate("/signup")} style={{margin: "0px 5px ",padding: "5px 15px",borderRadius: 20, border: "1px solid gray", background:"black", color:"white", fontFamily:"OpenAI Sans, sans-serif", fontSize: 15, cursor:"pointer"}}>
                    Signup
                </button>

                <button onClick={() => logout()} style={{margin: "0px 5px ",padding: "5px 15px",borderRadius: 20, border: "1px solid gray", background:"black", color:"white", fontFamily:"OpenAI Sans, sans-serif", fontSize: 15, cursor:"pointer"}}>
                    Logout
                </button>

            </div>

    </div>
}