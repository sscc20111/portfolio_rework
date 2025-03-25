import React, { useState, } from 'react';
import axios from 'axios';

import LoginToken from './LoginToken'
import './Login.css'

const LoginForm = ({open}) => {
    const [dataName, setName] = useState('');
    const [dataPassword, setPassword] = useState('');
    
    const signUpDB = async (e) => {
        e.preventDefault();
        if(dataName === '' || dataPassword === ''){
            alert('필드를 모두 작성해주세요!');
        }else{
            try {
                const response = await axios.post('http://nmwoo.info/backend/sign_post.php', {
                    password: dataPassword,
                    nickname: dataName,
                });
                if(response.data.message === 'Post saved successfully'){
                    LoginToken(dataName); //회원가입 성공 토큰 발급
                    open(e); //cover open

                }else{
                    // alert(response.data.message);
                    loginDB(e);
                }
            } catch (error) {
                console.error('Error saving post:', error);
            }
        }
    };
    const loginDB = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://nmwoo.info/backend/login_post.php', {
                password: dataPassword,
                nickname: dataName,
            });
            if(response.data.message === 'Login Post successfully'){
                LoginToken(dataName); //로그인 성공 토큰 발급
                open(e); //cover open

            }else{
                alert('비밀번호가 올바르지 않습니다 ㅠ');
            }
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };


    return(
        <div className='loginBox w-100'>
            <div className="form">
                <form className="login-form" onSubmit={signUpDB}>
                    <div className='userName inputBox p-3'>
                        <input className='' type="text" placeholder="name" value={dataName} onChange={(e) => setName(e.target.value)}/>
                        <p>님의 메모</p>
                    </div>
                    <div className='userSign inputBox p-3'>
                        <p>Sign</p>
                        <input className='' type="password" placeholder="password" value={dataPassword} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className='coverOpen btn btn-sm' type="submit">방명록 쓰기</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm