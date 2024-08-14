import { Container } from 'react-bootstrap'
import gsap from 'gsap';
import {Power1, Power2, Power3 } from 'gsap';

import './assets/style/style.css'
import { useEffect, useRef, useState } from 'react'

//************section01 함수***********//
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



const Main = () => {
    //************section01 함수***********//
    const [test,settest] = useState({})
    const imgtargets = Array.from(document.querySelectorAll('.gridItems .imgBox figure img'));
    
    const imgMotion = (e) => {
        //마우스 move에 따른 함수
        const { left: controllLeft, top: controllTop } = e.target.getBoundingClientRect(); //text X,Y범위 계산
        const mouseX = e.clientX - controllLeft; //객체와 마우스 상대위치X 계산
        const mouseY = e.clientY - controllTop; //객체와 마우스 상대위치Y 계산
        const xDecimal = mouseX / test.controllSizeX; //그래프로 컨트롤 하기위해 백분율로 변환
        const yDecimal = mouseY / test.controllSizeY; //그래프로 컨트롤 하기위해 백분율로 변환
        const X = test.maxX * Math.sin(xDecimal); //부드러운 움직임을 위해 sin그래프 활용
        const Y = test.maxY * Math.sin(yDecimal); //부드러운 움직임을 위해 sin그래프 활용

        imgtargets.forEach((target, index) => {
            gsap.to(target, { x: X, y: Y, delay: 0.04 * index, duration:1.5, ease: `Power${index + 1}.easeOut` });
        });
    };

    const imgMotionStage = (e) => {
        //마우스 hover 객체의 정보 취합
        const { offsetWidth: controllSizeX, offsetHeight: controllSizeY } = e.target;
        const maxX = controllSizeX / 15; //좌우 1/15 비율로 이미지 모션
        const maxY = controllSizeY / 5; //상하 1/5 비율로 이미지 모션

        settest({maxX, maxY, controllSizeX, controllSizeY})
    }

    useEffect(() => {
        gridAnimation()
    },[])

    return(
        <Container className="MainWrap">
            <section className="section01">
                <div className="gridItems gridItem1">
                    <div className="textBox">
                        <span className="cover"></span>
                        <div className="textWrap">
                            <a className='navigationBtn' href='#About' onMouseEnter={imgMotionStage} onMouseMove={imgMotion}>About</a>
                            <a className='navigationBtn' href='#Projects' onMouseEnter={imgMotionStage} onMouseMove={imgMotion}>Projects</a>
                            <a className='navigationBtn' href='#GuestBook' onMouseEnter={imgMotionStage} onMouseMove={imgMotion}>GuestBook</a>
                        </div>
                    </div>
                    <div className="imgBox">
                        <span className="cover"></span>
                        <figure>
                            <img style={{background:`url(${require('./assets/img/Grid1.png')}) no-repeat center / cover`}}></img>
                        </figure>
                    </div>
                </div>
                <div className="gridItems gridItem2">
                    <div className="imgBox">
                        <span className="cover"></span>
                        <figure>
                            <img style={{background:`url(${require('./assets/img/Grid2.png')}) no-repeat center / cover`}}></img>
                        </figure>
                    </div>
                    <div className="textBox">
                        <span className="cover"></span>
                        <div className="textWrap">
                            <h4>Front-end</h4>
                            <h4>Development</h4>
                            <a href="#Contact" onMouseEnter={imgMotionStage} onMouseMove={imgMotion}>Contact</a>
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
                            <img style={{background:`url(${require('./assets/img/Grid3.png')}) no-repeat center / cover`}}></img>
                        </figure>
                    </div>
                </div>
            </section>
            <section className="section02">Section02</section>
            <section className="section03">Section03</section>
            <section className="section04">Section04</section>
            <section className="section05">Section05</section>
        </Container>
    )
}

export default Main;