import React, { createRef } from 'react';

const getExperienceData = [
    {
        link:'http://wowm.1004home.kr/',
        source:require('../assets/img/work1.png'),
        title:'와우엠',
        nodeRef:createRef(null)
    },
    {
        link:'http://iaan.1004home.kr/',
        source:require('../assets/img/work2.png'),
        title:'이안',
        nodeRef:createRef(null)
    },
    {
        link:'http://ccmlaw.1004home.kr/',
        source:require('../assets/img/work3.png'),
        title:'충만법무법인',
        nodeRef:createRef(null)
    },
    {
        link:'http://com2verse.1004home.kr/',
        source:require('../assets/img/work4.png'),
        title:'컴투버스',
        nodeRef:createRef(null)
    },
    {
        link:'http://muirim.com/',
        source:require('../assets/img/work5.png'),
        title:'무이림',
        nodeRef:createRef(null)
    },
    {
        link:'https://www.kandesign.kr/',
        source:require('../assets/img/work6.png'),
        title:'칸디자인',
        nodeRef:createRef(null)
    },
    {
        link:'http://pidotech.1004home.kr/',
        source:require('../assets/img/work7.png'),
        title:'피도텍',
        nodeRef:createRef(null)
    },
    {
        link:'https://www.apsuninc.com/',
        source:require('../assets/img/work8.png'),
        title:'앞썬',
        nodeRef:createRef(null)
    },
];

const getSkillData = [
    [
        require('../assets/img/php.png'),
        require('../assets/img/react.png'),
        require('../assets/img/js.png'),
        require('../assets/img/jquery.png'),
        require('../assets/img/figma.png'),
        require('../assets/img/bootstrap.png'),
        require('../assets/img/gsap.png'),
    ],

    [
        require('../assets/img/sql.png'),
    ],

    [
        require('../assets/img/git.png'),
        require('../assets/img/sourcetree.png')
    ]
]

export {getExperienceData, getSkillData}