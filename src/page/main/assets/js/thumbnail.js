import { useEffect } from "react";
import canvasJs from "../../../../assets/js/canvas";
import introImg from '../../../../assets/img/intro.jpg'


const ThumbnailComponent = ({thumbnailItem}) => {
    useEffect(()=>{
        canvasJs('.test',{
            size: 400,
            backgroundStyles: 'line',
            Color: 'black',
            speed: 150
        })
        canvasJs('.test',{
            size: 500,
            backgroundStyles: 'line',
            Color: 'black',
            speed: 150
        })
        canvasJs('.test',{
            size: 400,
            backgroundStyles: 'img',
            imgSrc:introImg,
            Color: 'black',
            speed: 150
        })
    },[]);

    return(
    <>
        <div className='TempElement'>
            <div className="test"></div>
        </div>
    </>
    )

};
export default ThumbnailComponent;