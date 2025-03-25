import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { FloatingLabel, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import LoginForm from './Login/Login'
import loginTokenExpiry from './Login/LoginTokenExpiry'

import flip from './components/flip'
import PostIt from './components/PostIt'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


const style = () => { //postit 위치 랜덤 생성
  const randomBetween = (min, max) => {
    return min + Math.ceil(Math.random() * max);
  };

  const style = 'translate(' + randomBetween(0, window.innerWidth - 150) + 'px,' + randomBetween(0, window.innerHeight - 150) + 'px) rotate(' + randomBetween(-15, 15) + 'deg)';
  return style
}




const PostitCreate = ({ LoginCheck, postitSave, CreatDummy, PostitClose, Cancel}) => {

  const CoverOpen = (e) => {//커버 열기
    const activeMotion = document.querySelectorAll('.activeMotion');
    activeMotion.forEach(element => {
      element.classList.toggle('coverOpen');
      element.classList.remove('coverClose');
    });

    const activeZIndex = document.querySelector('.postitCoverFront');//input 덮고있는 cover zIndex 변경
    setTimeout(() => {
      activeZIndex.style.zIndex = '2'; //input 덮고있는 cover zIndex 변경
    }, 1000);
    CreatDummy(e); //flip을 위해 더미 생성
  }

  const CoverClose = () => {//커버 닫기
    const activeMotion = document.querySelectorAll('.activeMotion');
    activeMotion.forEach(element => {
      element.classList.toggle('coverOpen');
      element.classList.add('coverClose');
    });

    const activeZIndex = document.querySelector('.postitCoverFront');
    activeZIndex.style.zIndex = '3'; 
  }

  const SubmitHandle = (e, postitText) => {
    postitSave(e, postitText);
    CoverClose();

    setTimeout(() => {//닫기 모션후 실행
      PostitClose();

      const flipTo = document.querySelector('.postitForm'); //formWrap 다시 생성
      flipTo.classList.toggle("flipActive");
    }, 600);
  }

  const CreateCancel = () => {
    Cancel();
    CoverClose();

    setTimeout(() => {//닫기 모션후 실행
      PostitClose();
    }, 600);
  }

  const date = new Date()

  return (
    <div className="postitBox" data-flip-id="flipPostit">
      <div className="postitWrap wh-100">
        <div className="postitCover postitCoverFront wh-100">
          <div className="coverWrap perspective wh-100">
            <div className="cover activeMotion wh-100 coverFront">
              <button className='postitBoxClose' onClick={PostitClose}><FontAwesomeIcon icon={faXmark} /></button>
              <h3>STICKY NOTES</h3>
              <LoginForm open={CoverOpen} ></LoginForm>
            </div>
            <div className='cover activeMotion wh-100 coverBack'></div>
          </div>
          <div className="shadowWrap perspective wh-100">
            <div className="shadow activeMotion wh-100"></div>
          </div>
        </div>
        <div className="postitCover postitCoverBack wh-100">
          <div className="postitHeader">
            <span>NAM MINWOO</span>
            <h3>STICKY NOTES</h3>
            <p>GUESTBOOK</p>
          </div>
          <div className="postitFooter">
            <p>{date.getMonth()+1}-{date.getDate()} {date.getHours()}:{date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()}</p>
            <p></p>
          </div>
        </div>
        <div className="postitFormWrap">
          <PostitForm SubmitHandle={SubmitHandle} CancelHandle={CreateCancel}></PostitForm>
          <span></span><span></span><span></span>
        </div>
      </div>

    </div>
  )
};

const PostitForm = ({SubmitHandle, CancelHandle}) => {
  const [PostItText, setPostItText] = useState('');//글 작성or수정

  const Submit = (e) => {
    SubmitHandle(e, PostItText);
    setPostItText('');
  }

  const Cancel = () => {
    CancelHandle();
    setPostItText('');
  }


  return (
    <div className='postitForm' data-flip-id="flipform">
      <div className="postitTable wh-100">
        <FloatingLabel className='' controlId="postitText" label='방명록을 작성해주세요'>
          <FormControl as="textarea" placeholder="Leave a comment here" style={{ height: '240px' }} value={PostItText} onChange={(e) => setPostItText(e.target.value)}></FormControl>
        </FloatingLabel>
        <div className="buttons">
          <button className="cancel" onClick={Cancel}>cancel</button>
          <button className="save" onClick={Submit}>submit</button>
        </div>
      </div>
    </div>

  )
}

const Board = () => {
  const [postits, setPostIts] = useState([]);
  const [id, setId] = useState(0);
  const [FlipArry, setFlip] = useState([]);

  const [isLoginTokenCheck,setisLoginTokenCheck] = useState(loginTokenExpiry()); //로그인 유무 확인 //첫 로딩때만 확인하면 됨
  const [CreateOrModifyState, setCreateOrModifyState] = useState(''); //새 글(true) or 수정(false) //flip을 위해 필요



  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (postits && postits.length !== 0) {
      setId(postits.slice(-1)[0].id);
    } else {
      setId(0);
    };
  }, [postits]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://nmwoo.info/backend/backend.php');
      const fetchData = response.data.map((postit) => {
        return {
          date: postit.date,
          id: postit.id,
          ip: postit.ip,
          state: Boolean(parseInt(postit.state)),
          style: { transform: postit.style },
          postit: postit.text,
          user_data: postit.user_data
        };
      });
      setPostIts(fetchData);
    } catch (error) {
      console.error('Error fetching data:', error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://nmwoo.info/backend/save_post.php', {
        text: 'textValue',
        user_data: JSON.parse(localStorage.getItem('token')).user_data,
        style: style(),
        state: false
      });
    } catch (error) {
      console.error('Error saving post:', error);
    }
    fetchData();
  };

  const handleUpdate = async (e, newText, i, transform) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://nmwoo.info/backend/update_post.php', {
        text: newText,
        id: i,
        style: transform,
        state: true
      });
    } catch (error) {
      console.error('Error saving post:', error);
    }
    fetchData();
  };

  const bbs_delete = async (id) => {
    try {
      const response = await axios.post('http://nmwoo.info/backend/delete_post.php', {
        id: id
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    fetchData();
  };



  const creatDummyPostIt = (e) => {//더미 생성
    handleSubmit(e);
    setCreateOrModifyState(true); //수정or생성 판별
    setFlip(['.flipIndex','.postitFormWrap .postitForm']);
  }

  const postitSave = (e, postitText) => {//글 등록
    if (CreateOrModifyState === true) {//생성
      const updatedPostIts = postits.filter(postit => postit.id === id);
      const style = updatedPostIts[0].style.transform;
      flip(FlipArry[0] + (id), FlipArry[1]);

      handleUpdate(e, postitText, id, style);
    } 
    if (CreateOrModifyState === false)  {//수정
      const updatedPostIts = postits.filter(postit => postit.id === FlipArry[2]);
      const style = updatedPostIts[0].style.transform;
      flip(FlipArry[0], FlipArry[1]);
      
      handleUpdate(e, postitText, FlipArry[2], style);

      const FormBox = document.querySelector('.modifyFormBox');//form 잔존 오류 회피
      FormBox.style.display = 'none';
  
    }
  }

  const modify = (from, to, id) => {//수정
    const FormBox = document.querySelector('.modifyFormBox');//form 잔존 오류 회피
    FormBox.style.display = 'block';

    flip(from, to);
    setFlip([from, to, id]); //수정or취소 후 원위치
    setCreateOrModifyState(false); //수정or생성 판별

    const updatedPostIts = postits.map(postit => {
      if (postit.id === id) {
        return { ...postit, state: false };
      }
      return postit;
    });
    setPostIts(updatedPostIts);
  }

  const Cancel = () => {//생성 취소, 수정 취소
    if (CreateOrModifyState === true)   {//생성
      bbs_delete(id);
    } 
    if (CreateOrModifyState === false)  {//수정
      setTimeout(() => {//form 잔존 오류 회피
        const FormBox = document.querySelector('.modifyFormBox');
        FormBox.style.display = 'none';
      }, 600);
  
      flip(FlipArry[0], FlipArry[1]);
      const updatedPostIts = postits.map(postit => {
        if (postit.id === id) {
          return { ...postit, state: true };
        }
        return postit;
      });
      setPostIts(updatedPostIts);
    }
  }

  const dragset = (e, transform, i) => {//포스팃 위치변경
    const updatedPostIts = postits.filter(postit => postit.id === i);
    const postitText = updatedPostIts[0].postit;

    handleUpdate(e, postitText, i, transform);
  }

  const PostitOpen_Close = () => {
    flip('.postitBtn','.postitBox');
  }

  return (
    <div className="board transitionBox">
      {postits.map((postit) => (
        <PostIt key={postit.id} postit={postit} drag={dragset} modify={modify} onRemove={bbs_delete}>
          {postit.postit}
        </PostIt>
      ))}
      <PostitCreate LoginCheck={isLoginTokenCheck} postitSave={postitSave} CreatDummy={creatDummyPostIt} PostitClose={PostitOpen_Close} Cancel={Cancel}>
      </PostitCreate>
      <div className='postitBtn' data-flip-id="flipPostit" onClick={PostitOpen_Close}>
        <h4>STICKY NOTES</h4>
      </div>
      <div className='modifyFormBox'>
        <PostitForm SubmitHandle={postitSave} CancelHandle={Cancel}></PostitForm>
      </div>

    </div>
  );
};



export default Board;
