import React, { useEffect } from 'react';
import gsap from 'gsap';

import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable) 


const PostIt = ({ postit, children, onRemove, drag, modify }) => {
    useEffect(()=>{
    Draggable.create(".postit",{
        onDragEnd: function(e) {
        const target = e.target.closest('.postit');
        const index = target.getAttribute('data-index');

        drag(e, target.style.transform, index)
        }
    });
    },[drag])

    const remove = () => {
        onRemove(postit.id);
    };

    const modifyTarget = (e) => {
        const target = e.target.closest('.postit')
        const modifyTarget = `.${target.classList[1]}`
        modify(modifyTarget, '.modifyFormBox .postitForm', postit.id)
    }


    if(postit.state){
    return (
        <div className={'postit flipIndex' + postit.id} style={postit.style} data-index={postit.id} data-flip-id="flipform">
            <p className='fs-5 p-2'>{children}</p>
            {JSON.parse(localStorage.getItem('token')) && postit.user_data === JSON.parse(localStorage.getItem('token')).user_data && (
                <span>
                    <button onClick={modifyTarget} className="btn btn-primary glyphicon glyphicon-pencil" >수정</button>
                    <button onClick={remove} className="btn btn-danger glyphicon glyphicon-trash" >삭제</button>
                </span>
            )}
        </div>
    );
    }else{
    return (
        <div className={'postit flipIndex' + postit.id + ' dumypostit'} style={postit.style} data-index={postit.index} data-flip-id="flipform">
            <p>{children}</p>
            <p>{postit.index}</p>
            {JSON.parse(localStorage.getItem('token')) && postit.user_data === JSON.parse(localStorage.getItem('token')).user_data && (
                <span>
                    <button onClick={modifyTarget} className="btn btn-primary glyphicon glyphicon-pencil" />
                    <button onClick={remove} className="btn btn-danger glyphicon glyphicon-trash" />
                </span>
            )}
        </div>
    );
    }
};

export default PostIt