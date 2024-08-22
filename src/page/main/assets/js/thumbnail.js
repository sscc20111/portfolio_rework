import { useEffect } from "react";
import canvasJs from "../../../../assets/js/canvas";


const ThumbnailComponent = ({thumbnailItem}) => {
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
    <>
        <div className='TempElement'>
            <div className="test"></div>
        </div>
    </>
    )

};
export default ThumbnailComponent;