// import { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'

import './assets/style/style.css'

import Section01 from './section01'
import Section02 from './section02'
import Section03 from './section03'
import Section04 from './section04'


const Main = () => {
    //************section01 함수***********//



    return(
        <Container className="MainWrap">
            <section className="section section01">
                <Section01></Section01>
            </section>
            <section className="section section02" id='About'>
                <Section02></Section02>
            </section>
            <section className="section section03">
                <Section03></Section03>
            </section>
            <section className="section section04">
                <Section04></Section04>
            </section>
        </Container>
    )
}

export default Main;