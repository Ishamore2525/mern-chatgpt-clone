import {Signup} from "./screens/Signup";
import {Login} from "./screens/Login";
import { Routes, Route} from "react-router";
import {Chat} from "./screens/Chat";

function App() {
  
    return <div>

        
              <Routes> {/*define all the routes in the app*/ }
                        <Route path = "/signup" element = {<Signup/>}/>{/*when url is /signin, render Auth component, route request to specific component based on url*/ } 
                        <Route path = "/login" element = {<Login/>}/>
                        <Route path = "/chat" element = {<Chat/>}/>
                        
                    </Routes>
        

    </div>
}

export default App
