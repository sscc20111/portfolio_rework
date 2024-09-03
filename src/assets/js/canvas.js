// import { useEffect, useState } from "react";

const canvasJs = (selecter, option) => {
    const container = document.querySelector(selecter);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    //setting
    canvas.width = canvas.height = option.size;
    const CentserX = canvas.width/2;  //중심 x
    const CentserY = canvas.height/2; //중심 y

    const total = 5; //point 개수
    const limit = 30; //움직임 반경
    const PointSpeed = 0.00051; //point속도 제어
    const rotationSpeed = 0.0001; //축 회전속도 제어

    //변동상수
    let angle = 0;
    let rotat = 0;

    //임시
    const L = 100; //반지름



    const InpitSVG = {
        point:[
            {x:468 ,y:146},
            {x:302 ,y:28},
            {x:69 ,y:80},
            {x:93 ,y:311},
            {x:129 ,y:485},
            {x:302 ,y:524},
            {x:478 ,y:492},
            {x:626 ,y:311}
        ],
        cp1:[
            {x:376 ,y:138},
            {x:252 ,y:1},
            {x:0 ,y:160},
            {x:110 ,y:423},
            {x:185 ,y:519},
            {x:342 ,y:522},
            {x:534 ,y:468},
            {x:626 ,y:204}
        ],
        cp2:[
            {x:351 ,y:56},
            {x:137 ,y:0},
            {x:77 ,y:199},
            {x:73 ,y:451},
            {x:261 ,y:525},
            {x:422 ,y:516},
            {x:625 ,y:417},
            {x:560 ,y:153}
        ],
    }

    const CatchPoint = ( x, y ) => {
        const Length = Math.sqrt(Math.pow(x-CentserX,2)+Math.pow(y-CentserY,2))
        const RadianX = Math.acos((x - CentserX)/Length)
        const RadianY = Math.asin((y - CentserY)/Length)
        return {Length,RadianX,RadianY}
    }

    const maxValue = () => {
        // 모든 좌표 값들을 하나의 배열로 모음
        const allValues = [...InpitSVG.point, ...InpitSVG.cp1, ...InpitSVG.cp2];

        // x와 y 값을 한 배열에 모음
        const allCoords = allValues.flatMap(coord => [coord.x, coord.y]);

        // 가장 큰 값 구하기
        const maxValue = Math.max(...allCoords);

        return maxValue
    
    };

    const MaxValue = maxValue();

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Array.from({ length: 8 }).forEach((_, index) => {
            ctx.beginPath();
            ctx.arc(update(index).x, update(index).y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";//임시
            ctx.fill();
            ctx.closePath();
        });
        Array.from({ length: 8 }).forEach((_, index) => {
            ctx.beginPath();
            ctx.moveTo(update(index).cp1X, update(index).cp1Y);
            ctx.lineTo(update(index).cp2X, update(index).cp2Y);
            ctx.strokeStyle = "green";
            ctx.stroke()
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(update(index).cp1X, update(index).cp1Y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "black";//임시
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(update(index).cp2X, update(index).cp2Y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "blue";//임시
            ctx.fill();
            ctx.closePath();

        });

        ctx.beginPath()
        ctx.moveTo(update(0).x, update(0).y);
        Array.from({ length: 7 }).forEach((_, index) => {
            ctx.bezierCurveTo(update(index).cp1X, update(index).cp1Y, update(index+1).cp2X, update(index+1).cp2Y, update(index+1).x, update(index+1).y );
        });
        ctx.bezierCurveTo(update(7).cp1X, update(7).cp1Y, update(0).cp2X, update(0).cp2Y, update(0).x, update(0).y );
        ctx.strokeStyle = "black";
        ctx.stroke()
        ctx.closePath();
    };

    const update = (index) => {
        //직각 삼각형의 좌표평면상 점(x,y)를 구하는 공식을 사용하여 함수 실행
        //x = 빗변길이 * conθ
        //y = 빗변길이 * sinθ

        const ratioChange = ((option.size - (limit*2)) / MaxValue);//canvas size에 맞게 svg포인트 변환
        const radian = 2*Math.PI * index / InpitSVG.point.length; //2π*(index/total)
        let wave = Math.sin(angle+radian) * limit; //(0~1)*(움직임 반경) //sinθ로 부드럽게

        let PointX = () => InpitSVG.point[index].x * ratioChange + limit;
        let PointY = () => InpitSVG.point[index].y * ratioChange + limit;
        let Cp1X = () => InpitSVG.cp1[index].x * ratioChange + limit;
        let Cp1Y = () => InpitSVG.cp1[index].y * ratioChange + limit;

        //(x,y)좌표 축 계산
        let FixedX = CentserX + (CatchPoint(PointX(index),PointY(index)).Length * Math.cos(CatchPoint(PointX(index),PointY(index)).RadianX)); //+rotat 축 회전(점θ 회전에는 영향을 주지않음)
        let FixedY = CentserY + (CatchPoint(PointX(index),PointY(index)).Length * Math.sin(CatchPoint(PointX(index),PointY(index)).RadianY)); //+rotat 축 회전(점θ 회전에는 영향을 주지않음)

        //(x,y)좌표 계산
        let x = FixedX + Math.cos(CatchPoint(PointX(index),PointY(index)).RadianX) * wave; //+rotat 점θ 회전(축 회전에는 영향을 주지않음)
        let y = FixedY + Math.sin(CatchPoint(PointX(index),PointY(index)).RadianY) * wave; //+rotat 점θ 회전(축 회전에는 영향을 주지않음)
        
        //(x,y)좌표 축 계산
        let FixedCpX = CentserX + (CatchPoint(Cp1X(index),Cp1Y(index)).Length * Math.cos(CatchPoint(Cp1X(index),Cp1Y(index)).RadianX)); //+rotat 축 회전(점θ 회전에는 영향을 주지않음)
        let FixedCpY = CentserY + (CatchPoint(Cp1X(index),Cp1Y(index)).Length * Math.sin(CatchPoint(Cp1X(index),Cp1Y(index)).RadianY)); //+rotat 축 회전(점θ 회전에는 영향을 주지않음)

        //(x,y)좌표 계산
        let cp1X = FixedCpX + Math.cos(CatchPoint(Cp1X(index),Cp1Y(index)).RadianX) * wave; //+rotat 점θ 회전(축 회전에는 영향을 주지않음)
        let cp1Y = FixedCpY + Math.sin(CatchPoint(Cp1X(index),Cp1Y(index)).RadianY) * wave; //+rotat 점θ 회전(축 회전에는 영향을 주지않음)
        
        //(cp1X,cp1Y)좌표 계산 //점(x,y)를 중심으로 x축,y축 대칭
        let cp2X = 2*x - cp1X;
        let cp2Y = 2*y - cp1Y;

        
        //움직임 제어
        angle += PointSpeed;

        //angle, rotat 무한 증가 방지
        if (angle >= Math.PI * 2) {
            angle -= Math.PI * 2;
        }

        return {x,y,cp1X,cp1Y,cp2X,cp2Y}
    };

    setInterval(draw, 15);
};

export default canvasJs