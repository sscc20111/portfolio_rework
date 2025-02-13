import { useEffect } from "react";
import canvasJs from "../assets/js/canvas"
import introImg from '../assets/img/intro.jpg'



const TestPage = () => {
    useEffect(()=>{
        canvasJs('.test',{
            size: 400,
            backgroundStyles: 'img',
            imgSrc: introImg,
            Color: 'black',
            speed: 150
        })
    },[]);


    return(
        <div className="testBox" style={{backgroundColor:'#cdcdcd', display:'flex', justifyContent:'center'}}>
            <div className="test"></div>
        </div>
    )
}

export default TestPage