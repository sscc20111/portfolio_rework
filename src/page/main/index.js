import { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'

import './assets/style/style.css'

import Section01 from './components/section01'
import Section02 from './components/section02'
import Section03 from './components/section03'
import Section04 from './components/section04'


const Main = () => {
    //************section01 함수***********//



    return(
        <Container className="MainWrap">
            <section className="section01">
                <Section01></Section01>
            </section>
            <section className="section02" id='About'>
                <Section02></Section02>
            </section>
            <section className="section03">
                <Section03></Section03>
            </section>
            <section className="section04">
                <Section04></Section04>
            </section>
            <section className="section05">Section05</section>
        </Container>
    )
}

export default Main;