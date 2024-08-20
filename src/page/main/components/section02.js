import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger)

const ThumbnailSet = (setthumbnail) => {//위치별 썸네일 컨텐츠 변경
    const sections = [
        { trigger: ".section02 .content1", thumbnail: 'thumbnail1', endTrigger: '.section02 .content2' },
        { trigger: ".section02 .content3", thumbnail: 'thumbnail2' },
        { trigger: ".section02 .content4", thumbnail: 'thumbnail3' }
    ];

    sections.forEach(({ trigger, thumbnail, endTrigger }) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top center",
                end: "bottom center",
                endTrigger: endTrigger ? endTrigger : '', //thumbnail1의 범위가 content 두개에 걸쳐있어 endTrigger 지정
                // markers: true,
                onEnter: () => setthumbnail(thumbnail),
                onEnterBack: () => setthumbnail(thumbnail),
            }
        });
    });
};

const ThumbnailMotion = () => {//썸네일 이동 모션 (css '.thumbnailBox' - transition과 같이 사용)
    const target = document.querySelector('.section02');
    gsap.timeline({
        scrollTrigger: {
            trigger: ".section02",
            start: "top center",
            end: "bottom center",
            onUpdate: self => {gsap.set('.section02 .thumbnailBox', { y: self.progress * target.offsetHeight });}//.section02의 height 값에 백분율을 곱한값
        }
    });
}

const AboutSection = () => {
    const [thumbnail, setthumbnail] = useState('thumbnail1');
    useEffect(()=>{
        ThumbnailSet(setthumbnail)
        ThumbnailMotion()
    },[])
    return(
        <>
        <div className='leftBox'>
            <div className='contents content1'>
                <h2>EDUCATION</h2>
                <div className='item item1'>
                    <h3>IIBI 방송정보국제교육원 <span>(2021.05.25 ~ 2021.10.05)</span></h3>
                    <ul>
                        <li><p>웹퍼블리싱 교육 이수</p></li>
                        <li><p>웹 디자인 교육이수</p></li>
                    </ul>
                </div>
                <div className='item item1'>
                    <h3>경기과학기술대학교 <span>(2013.03 ~ 2018.02)</span></h3>
                    <ul>
                        <li><p>기계설계학과 전공 졸업</p></li>
                    </ul>
                </div>
            </div>
            <div className='contents content2'>
                <h2>OTHER EXPERIENCE</h2>
                <div className='item'>
                    <ul>
                        <li><p>아이엠티주식회사 <span>(2018.04 - 2019.08)</span></p></li>
                        <li><p>기아(주)AutoLand광명 <span>(2017.07 - 2018.01)</span></p></li>
                    </ul>
                </div>
            </div>
            <div className='contents content3'>
                <h2>WORK EXPERIENCE</h2>
                <div className='item item1' >
                    <h3>(주)이프론트 <span>(2021.11.24 ~ 2022.12.30)</span></h3>
                    <ul>
                        <li><a href='http://wowm.1004home.kr/' target="_blank">와우엠 <span>(기업홍보, Fullpage개발(Parallax), 게시판 관리)</span></a></li>
                        <li><a href='http://iaan.1004home.kr/' target="_blank">이안 <span>(기업홍보, svg모션, 게시판 관리)</span></a></li>
                        <li><a href='http://ccmlaw.1004home.kr/' target="_blank">충만법무법인 <span>(기업홍보, 상담접수)</span></a></li>
                        {/* <li><a href='http://com2verse.1004home.kr/' target="_blank">컴투버스 <span>(기업홍보, 게시판 관리)</span></a></li> */}
                        <li><a href='http://muirim.com/' target="_blank">무이림 <span>(숙박업체, 객실홍보, 예약관리)</span></a></li>
                        <li><a href='https://www.kandesign.kr/' target="_blank">칸디자인 <span>(기업홍보)</span></a></li>
                        <li><a href='https://www.pidotech.com/' target="_blank">피도텍 <span>(기업홍보, Fullpage개발, 게시판 관리)</span></a></li>
                        <li><a href='https://www.apsuninc.com/' target="_blank">앞썬 <span>(기업홍보, 상품관리, 게시판 관리)</span></a></li>
                    </ul>
                </div>
            </div>
            <div className='contents content4'>
                <h2>SKILLS</h2>
                <div className='item item'>
                    <h4>Frontend</h4>
                    <ul>
                        <li><p>PHP</p></li>
                        <li><p>React</p></li>
                        <li><p>JavaScript</p></li>
                        <li><p>JQuery</p></li>
                        <li><p>Figma</p></li>
                        <li><p>Bootstrap</p></li>
                        <li><p>GSAP</p></li>
                    </ul>
                </div>
                <div className='item item'>
                    <h4>Backend</h4>
                    <ul>
                        <li><p>SQL</p></li>
                    </ul>
                </div>
                <div className='item item'>
                    <h4>Version Control</h4>
                    <ul>
                        <li><p>Git Hub</p></li>
                        <li><p>SourceTree</p></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='rightBox'>
            <div className='thumbnailBox'>
                {/* 프론트앤드 개발 필요 */}
                <div className='TempElement'>{thumbnail}</div>
            </div>
        </div>
        </>
    )
}

export default AboutSection