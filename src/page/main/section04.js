import React, { useRef } from 'react';

import { Button, FloatingLabel, Form, FormControl } from 'react-bootstrap';

import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const form = useRef();

    const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_ku5onzq', 'template_yp7j9gj', form.current, 'CbApPngOAIHNzwwgW')
        .then((result) => {
            console.log(result.text);
            document.querySelector('.sendOk').style.display = 'block'//send 완료 메시지
        }, (error) => {
            console.log(error.text);
        });
    };

    return(
            <div className='contactWrap'>
                <div className='leftBox'>
                    <h2>CONTACT ME</h2>
                    <h3>남민우 <span>Nam Minwoo</span></h3>
                    <ul>
                        <li>
                            <h4>E-MAIL:</h4>
                            <p>sscc20111@naver.com</p>
                        </li>
                        <li>
                            <h4>PHONE:</h4>
                            <p>010-9255-9404</p>
                        </li>
                        <li className='sendOk' style={{display:'none'}}>
                            <p>연락주셔서 감사합니다. <br />빠른 시일 내에 답변 드리겠습니다</p>
                        </li>
                    </ul>
                </div>
                <div className='rightBox'>
                    <Form ref={form} className='gform' onSubmit={sendEmail}>
                        <Form.Group className='inputWrap'>
                            <FloatingLabel label='이름 또는 회사명 *' className='mb-3'>
                            <FormControl type='text' name="name"></FormControl>
                            </FloatingLabel>
                            <FloatingLabel label='이메일 *' className='mb-3'>
                            <FormControl type='email' name="email"></FormControl>
                            </FloatingLabel>
                            <FloatingLabel label='메시지 *' className='mb-3'>
                            <FormControl as="textarea" name="message" placeholder="Leave a comment here" style={{ height: '200px' }}></FormControl>
                            </FloatingLabel>
                        </Form.Group>
                        <Button onClick={sendEmail} variant="dark">Send</Button>
                    </Form>
                </div>
            </div>
    )
}

export default ContactForm