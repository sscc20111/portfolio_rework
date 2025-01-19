// import { useEffect, useState } from "react";
import {InpitSVG, maxValue} from './input'
import asdfa from '../img/intro.jpg'

const canvasJs = (selecter, option) => {
    const container = document.querySelector(selecter);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    //setting
    canvas.width = canvas.height = option.size;
    const CenterX = canvas.width/2;  //중심 x
    const CenterY = canvas.height/2; //중심 y
    const total = InpitSVG.point.length;
    const MaxValue = maxValue();

    const 반경 = 10; //출렁임 정도

    //변동상수
    let 변동상수 = 0;
    let img;


    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        Array.from({ length: total }).forEach((_, index) => {
            const {x, y} = update(index);

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";//임시
            ctx.fill();
            ctx.closePath();

            // ctx.beginPath();
            // ctx.moveTo(CenterX,CenterY);
            // ctx.lineTo(x, y);
            // ctx.strokeStyle = "green";
            // ctx.stroke()
            // ctx.closePath();
        });
        Array.from({ length: total }).forEach((_, index) => {
            const {cp1X, cp2X, cp1Y, cp2Y} = update(index);

            ctx.beginPath();
            ctx.moveTo(cp1X, cp1Y);
            ctx.lineTo(cp2X, cp2Y);
            ctx.strokeStyle = "green";
            ctx.stroke()
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(cp1X, cp1Y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "black";//임시
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(cp2X, cp2Y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "blue";//임시
            ctx.fill();
            ctx.closePath();

            // ctx.beginPath();
            // ctx.moveTo(CenterX,CenterY);
            // ctx.lineTo(cp1X, cp1Y);
            // ctx.strokeStyle = "green";
            // ctx.stroke()
            // ctx.closePath();
            // ctx.beginPath();
            // ctx.moveTo(CenterX,CenterY);
            // ctx.lineTo(cp2X, cp2Y);
            // ctx.strokeStyle = "green";
            // ctx.stroke()
            // ctx.closePath();
        });

        if(option.backgroundStyles === 'img'){
            ctx.save();
        }
        ctx.beginPath()
        ctx.moveTo(update(0).x, update(0).y);
        Array.from({ length: total-1 }).forEach((_, index) => {
            const {cp1X, cp1Y} = update(index);
            const {x, y, cp2X, cp2Y} = update(index+1);

            ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, x, y );
        });
        ctx.bezierCurveTo(update(total-1).cp1X, update(total-1).cp1Y, update(0).cp2X, update(0).cp2Y, update(0).x, update(0).y );
        ctx.closePath();
        switch(option.backgroundStyles) {
            case 'img' :
                ctx.clip();
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height); 
                ctx.restore();
            break;
            case 'fill' :
                ctx.fillStyle = option.Color;
                ctx.fill();
                break;
                case 'line' :
                ctx.strokeStyle = option.Color;
                ctx.stroke();
        }
    };

    const lerp = (start, end, t) => start + (end - start) * t;
    const CatchPoint = ( x, y ) => {
        const Length = Math.sqrt(Math.pow(x-CenterX,2)+Math.pow(y-CenterY,2));
        const 라디안 = Math.atan2(y - CenterY, x - CenterX);
        const RadianX = Math.acos((x - CenterX)/Length);
        const RadianY = Math.asin((y - CenterY)/Length);
        return {Length,RadianX,RadianY,라디안}
    }
    const transform_Length = (x,y) => Math.sqrt(Math.pow(x-CenterX,2)+Math.pow(y-CenterY,2));
    const transform_Radian = (x,y) => Math.atan2(y - CenterY, x - CenterX);

    const update = (index) => {
        const ratioChange = ((option.size - (반경*2)) / MaxValue);//canvas size에 맞게 svg포인트 변환
        const radian = 2*Math.PI * index / total; //2π*(index/total)
        const wave = Math.sin(변동상수+radian) * 반경; //(0~1)*(움직임 반경) //sinθ로 부드럽게

        const Fx = InpitSVG.point[index].x * ratioChange + 반경;
        const Fy = InpitSVG.point[index].y * ratioChange + 반경;
        const Cp1X = InpitSVG.cp1[index].x * ratioChange + 반경;
        const Cp1Y = InpitSVG.cp1[index].y * ratioChange + 반경;

        //bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) 에 필요한 좌표 계산
        //x = 빗변길이 * conθ
        //y = 빗변길이 * sinθ
        //(x,y)좌표
        const {라디안:라디안1, Length:Length1} = CatchPoint(Fx,Fy);
        const x = (Math.cos(라디안1)*Length1+CenterX) + (Math.cos(라디안1)*wave); // x좌표 + wave
        const y = (Math.sin(라디안1)*Length1+CenterY) + (Math.sin(라디안1)*wave); // y좌표 + wave

        //(cp1x,cp1y)좌표
        const {라디안:라디안2, Length:Length2} = CatchPoint(Cp1X,Cp1Y);
        const cp1X = (Math.cos(라디안2)*Length2+CenterX) + (Math.cos(라디안2)*wave); // x좌표 + wave 
        const cp1Y = (Math.sin(라디안2)*Length2+CenterY) + (Math.sin(라디안2)*wave); // y좌표 + wave 
        
        //(cp2X,cp2Y)좌표 //점(x,y)를 중심으로 x축,y축 대칭
        const cp2X = 2*x - cp1X;
        const cp2Y = 2*y - cp1Y;

        //움직임 제어 
        변동상수 = (변동상수+option.speed * 0.00001) % (Math.PI * 2); //rotat 무한 증가 방지
        
        return {x,y,cp1X,cp1Y,cp2X,cp2Y}
    };

    if (option.backgroundStyles === 'img') { 
        img = new Image(); 
        img.src = option.imgSrc; 
        img.onload = () => { setInterval(draw, 15); // 이미지가 로드된 후에 캔버스를 그립니다. 
        }; 
        // console.log(img.src); 
    } else { 
        setInterval(draw, 15); // 이미지가 없는 경우 바로 캔버스를 그립니다. 
    }
};

export default canvasJs