
interface CenterProps {
  children: React.ReactNode;
}

export function Center(props: CenterProps){

    return <div style = {{display:"flex", justifyContent:"center"}}>
        {props.children}
    </div>
}