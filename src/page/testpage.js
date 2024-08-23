import { useEffect } from "react";
import canvasJs from "../assets/js/canvas"



const TestPage = () => {
    useEffect(()=>{
        canvasJs('.test',{
            size: 300,
            background: {
            backgroundStyles: 'color',
            backgroundColor: '#80B1C2',
            globalAlpha: 0.8
            },
            speed: 350
        })
    },[]);


    return(
        <div className="testBox" style={{backgroundColor:'#cdcdcd', display:'flex', justifyContent:'center'}}>
            <div className="test"></div>
        </div>
    )
}

export default TestPage