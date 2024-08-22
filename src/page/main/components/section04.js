import { FloatingLabel, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"

const ContactSection = () => {
    const sendEmail = (e) => {
        e.preventDefault(); //refresh 방지
        console.log('submit,프론트앤드 개발 필요')
        // 프론트앤드 개발 필요
    }

    return (
    <>
        <div className="contactWrap">
            <div className="leftBox">
                <h3>CONTACT ME</h3>
                <ul>
                    <li>
                        <p>남민우</p>
                        <span>Nam Minwoo</span>
                    </li>
                    <li>
                        <p>E-MAIL:</p>
                        <span>sscc20111@naver.com</span>
                    </li>
                    <li>
                        <p>PHONE:</p>
                        <span>010-9255-9404</span>
                    </li>
                </ul>
            </div>
            <div className="rightBox">
                <Form className='gform' onSubmit={sendEmail} onsubmit="return false;">
                    <FormGroup className='inputWrap'>
                        <FloatingLabel label='이름 또는 회사명 *'>
                            <FormControl type='text' name="name" placeholder="Leave a comment here"></FormControl>
                        </FloatingLabel>
                        <FloatingLabel label='이메일 *'>
                            <FormControl type='email' name="email" placeholder="Leave a comment here"></FormControl>
                        </FloatingLabel>
                        <FloatingLabel label='메시지 *'>
                            <FormControl as="textarea" name="message" placeholder="Leave a comment here"></FormControl>
                        </FloatingLabel>
                    </FormGroup>
                    <button>Send</button>
                </Form>
            </div>
        </div>
    </>
    )
}

export default ContactSection