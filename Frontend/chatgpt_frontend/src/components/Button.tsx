

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
}

export function Button(props: ButtonProps){

    return <div style = {{display: "flex", margin:10, marginTop:30,fontSize: "14px", fontFamily: "intervariable, sans-serif", cursor:"pointer"}} onClick={props.onClick}>

        <div style = {{display:"flex", alignItems:"center", paddingRight: 10}}>
            {props.leftIcon}
        </div>

        <div className ="newchatbtn" style = {{display:"flex", alignItems:"center"}}>
            {props.children}
        </div>

    </div>

}