import gsap from 'gsap';
import {Power1, Power2, Power3 } from 'gsap';

import { useEffect, useRef, useState } from 'react'

const gridAnimation = async () => {
    const gridWrap = document.querySelector('.section01');
    const gridItem = document.querySelectorAll('.gridItems');
    const coverItem = document.querySelectorAll('.textBox .cover');
    const imgCoverItem = document.querySelectorAll('.imgBox .cover');
    const textItem = document.querySelectorAll('.textWrap');
    
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const randomLR = () => Math.random() < 0.5 ? 'left' : 'right';

    const activateItems = async (items, delayMax, callback) => { //(배열, 최대 딜레이, 실행함수)
        Array.from(items).map(async (item)=> {//객체별 실행 딜레이로 모션의 다양성 효과
            await delay(Math.random() * delayMax);
            callback(item);
        })
    };

    await delay(100);
    gridWrap.classList.add('active');

    await delay(300);
    await activateItems(gridItem, 500, item => item.classList.add('active'));//그리드별 넓이 모션
    
    await delay(500);
    await activateItems(coverItem, 500, item => item.classList.add('active'));//text cover 모션
    
    await activateItems(imgCoverItem, 500, item => item.style[randomLR()] = '100%');//img cover 모션

    await delay(600);
    textItem.forEach(item => item.classList.add('active'));//text fadeIn
};

const imgMotionStage = (e, setStage) => {//MouseEnter - textBox의 객체 정보 취합
    const { offsetWidth: controllSizeW, offsetHeight: controllSizeH } = e.target; //text Width,Height 크기 계산
    const { left: controllLeft, top: controllTop } = e.target.getBoundingClientRect(); //text X,Y 절대 좌표 계산

    setStage({ controllSizeW, controllSizeH, controllLeft, controllTop })
}


const imgMotion = (e, Stage, imgtargets) => {
    // MouseMove 이벤트 핸들러
    const maxX = Stage.controllSizeW / 15; //최대 이동거리 제한
    const maxY = Stage.controllSizeH / 5;  //최대 이동거리 제한
    const mouseX = e.clientX - Stage.controllLeft; // 상대좌표X 계산
    const mouseY = e.clientY - Stage.controllTop;  // 상대좌표Y 계산
    const xDecimal = mouseX / Stage.controllSizeW; // Stage 마우스 위치X 백분율 변환
    const yDecimal = mouseY / Stage.controllSizeH; // Stage 마우스 위치Y 백분율 변환
    const X = maxX * Math.sin(xDecimal); // 부드러운 움직임을 위해 sin함수 활용
    const Y = maxY * Math.sin(yDecimal); // 부드러운 움직임을 위해 sin함수 활용

    imgtargets.forEach((target, index) => {
        // 각 이미지 타겟에 애니메이션 적용
        gsap.to(target, { 
            x: X, 
            y: Y, 
            delay: 0.04 * index, // 각 타겟에 대한 지연 시간
            duration: 1.5, // 애니메이션 지속 시간
            ease: `Power${index + 1}.easeOut`
        });
    });
};

const GridSection = () => {
    const [Stage,setStage] = useState({})
    const imgtargets = Array.from(document.querySelectorAll('.gridItems .imgBox figure img'));

    useEffect(() => {
        gridAnimation()
    },[])

    return(
        <>
        <div className="gridItems gridItem1">
            <div className="textBox">
                <span className="cover"></span>
                <div className="textWrap">
                    <a className='navigationBtn' href='#About' onMouseEnter={(e)=>imgMotionStage(e, setStage)} onMouseMove={(e)=>imgMotion(e, Stage, imgtargets)}>About</a>
                    <a className='navigationBtn' href='#Projects' onMouseEnter={(e)=>imgMotionStage(e, setStage)} onMouseMove={(e)=>imgMotion(e, Stage, imgtargets)}>Projects</a>
                    <a className='navigationBtn' href='#GuestBook' onMouseEnter={(e)=>imgMotionStage(e, setStage)} onMouseMove={(e)=>imgMotion(e, Stage, imgtargets)}>GuestBook</a>
                </div>
            </div>
            <div className="imgBox">
                <span className="cover"></span>
                <figure>
                    <img style={{background:`url(${require('../assets/img/Grid1.png')}) no-repeat center / cover`}}></img>
                </figure>
            </div>
        </div>
        <div className="gridItems gridItem2">
            <div className="imgBox">
                <span className="cover"></span>
                <figure>
                    <img style={{background:`url(${require('../assets/img/Grid2.png')}) no-repeat center / cover`}}></img>
                </figure>
            </div>
            <div className="textBox">
                <span className="cover"></span>
                <div className="textWrap">
                    <h4>Front-end</h4>
                    <h4>Development</h4>
                    <a href="#Contact" onMouseEnter={(e)=>imgMotionStage(e, setStage)} onMouseMove={(e)=>imgMotion(e, Stage, imgtargets)}>Contact</a>
                </div>
            </div>
        </div>
        <div className="gridItems gridItem3">
            <div className="textBox">
                <span className="cover"></span>
                <div className="textWrap">
                    <h4>NamMinwoo</h4>
                    <h5>남민우</h5>
                    <p>안녕하세요, 프론트엔드 개발자 남민우입니다.<br></br><br></br>

                        저는 퍼블리셔로서의 경험을 바탕으로<br></br>
                        사용자에게 최상의 경험을 제공 하기 위해 노력하는 개발자입니다.<br></br><br></br>

                        프로젝트의 목표와 방향에 따라 최적화된 웹 서비스를 개발하기 위해<br></br>
                        동료 개발자들과의능동적인 커뮤니케이션이 필수라고 믿습니다.<br></br><br></br>

                        작업의 효율성과 생산성을 중요하게 생각하며<br></br>
                        끊임없이 진화하는 IT 시장에 발맞춰 항상 새로운 지식을 습득하고 싶습니다.<br></br>
                        제 노력과 열정을 통해 뛰어난 웹 개발자로서 성장하고 싶습니다.</p>
                </div>
            </div>
            <div className="imgBox">
                <span className="cover"></span>
                <figure>
                    <img style={{background:`url(${require('../assets/img/Grid3.png')}) no-repeat center / cover`}}></img>
                </figure>
            </div>
        </div>
        </>
    )
}

export default GridSection