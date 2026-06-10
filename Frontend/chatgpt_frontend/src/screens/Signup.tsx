import {SignupBanner} from "../components/SignupBanner";
import {SignupCredentials} from "../components/SignupCredentials";

export function Signup(){

    return <div style= {{display: "flex"}}>

    <div style ={{flex: 4}}>
        <SignupBanner/>
        
    </div>

    <div style ={{flex: 6}}>
        <SignupCredentials/>
        
    </div>

    </div>
}