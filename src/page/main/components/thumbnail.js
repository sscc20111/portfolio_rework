import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { gsap, Power1 , Power3 } from 'gsap';

import canvasJs from "../../../assets/js/canvas";
import introImg from '../../../assets/img/intro.jpg';
import { getExperienceData, getSkillData } from './about_data'


const Thumbnail1 = () => {
    useEffect(() => {
        canvasJs('.introWrap div',{
            size: 450,
            backgroundStyles: 'fill',
            Color: '#80B1C2',
            variation_speed: 200,
            cycle_speed: 1.5
        })
        canvasJs('.introWrap div',{
            size: 450,
            backgroundStyles: 'line',
            Color: 'black',
            variation_speed: 150,
            cycle_speed: 1
        })
        canvasJs('.introWrap div',{
            size: 450,
            backgroundStyles: 'img',
            imgSrc:introImg,
            Color: 'black',
            variation_speed: 150,
            cycle_speed: 1
        })
    }, []);

    return (
        <div className="introWrap">
            <div></div>
        </div>
    );
};

const Thumbnail2 = () => {
    const [TargetNumber,setTargetNumber] = useState(0);

    const MouseDirection = (e) => {//마우스 진입 방향 감지
        const targetRect = e.target.getBoundingClientRect();
        const mouseY = e.clientY;
        const direction = mouseY < targetRect.top + (targetRect.bottom - targetRect.top) / 2 ? '' : '-';
    
        return direction;
    };

    const ImgAnimation = () => {//gsap 실행
        const target = document.querySelectorAll('.section02 .content3 .item1 li');
        target.forEach((items,index) => {
            items.addEventListener('mouseenter', (event) => {
                setTargetNumber(index); //target index - 이미지 변경
                setTimeout(() => { //target 생성전 실행 방지
                    const targetIn = document.querySelector('.experienceWrap .imgBox .ImgItem-enter-active');
                    const targetOut = document.querySelector('.experienceWrap .imgBox .ImgItem-exit-active');
                    const DIRECTION = parseInt(`${MouseDirection(event)}220`, 10) // gsap 인식을 위해 변환
        
                    gsap.fromTo(targetIn, {yPercent:DIRECTION}, {yPercent:'0', opacity:1, ease: Power3.easeOut})
                    gsap.to(targetOut, {y:DIRECTION*-1, opacity:1, ease: Power3.easeOut})
                }, 10);
            });
        });
    }

    useEffect(()=>{
        ImgAnimation()
    },[]);

    return(
        <div className="experienceWrap">
            <div>
                <img className='monitorBox' src={require('../assets/img/monitor.png')}></img>
                <TransitionGroup className='imgBox'>
                    <CSSTransition key={TargetNumber} timeout={350} nodeRef={getExperienceData[TargetNumber].nodeRef} classNames="ImgItem">
                        <img src={getExperienceData[TargetNumber].source} ref={getExperienceData[TargetNumber].nodeRef}></img>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </div>
    )
}

const Thumbnail3 = ({animationActive}) => {
    useEffect(()=>{
        const target = document.querySelectorAll('.skillWrap .imgBox');
        if(animationActive === 'thumbnail3'){
            target.forEach((item,index)=>{
                gsap.killTweensOf(item);//오류 제거
                gsap.to(item, {scale: 1, opacity:1, duration:0.5, delay:0.1*(index),  ease: Power1.easeInOut})
            })
        }else{
            target.forEach((item)=>{
                gsap.killTweensOf(item);//오류 제거
                gsap.to(item, {scale: 0.3, opacity:0, duration:0.5,  ease: Power1.easeInOut})
            })

        } 
    },[animationActive]);

    return(
        <div className="skillWrap">
            <div>
                {getSkillData.map((title, index)=>(
                    <ul key={index}>
                        {title.map((item, index)=>(
                            <li key={index}>
                                <div className="imgBox">
                                    <img src={item}></img>
                                </div>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    )
}

export { Thumbnail1, Thumbnail2, Thumbnail3 };
