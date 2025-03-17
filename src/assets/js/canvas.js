// import { useEffect, useState } from "react";
import { InpitSVG, maxValue } from './input'
import { RandomWave, lerp, lerpAngle, CatchPoint, maxValue2 } from './calculate'
import asdfa from '../img/intro.jpg'

const canvasJs = (selecter, option) => {
    const container = document.querySelector(selecter);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    //setting
    canvas.width = canvas.height = option.size;
    const Center = option.size/2
    const total = InpitSVG.point.length;
    const MaxValue = maxValue();
    const MaxValue2 = maxValue2(InpitSVG.point);
    const randomWave = RandomWave(total);

    const VIBRATION = 10; //출렁임 계수
    const CYCLE_SPEED = option.cycle_speed * 0.00009; //변환 속도
    const VARIATION_SPPED = option.variation_speed * 0.000005 //진동 속도도

    //변동값
    let Variation = 0;
    let cycle = 0;
    let metronome = 0;
    let pattern;


    const imgtransition = (img) => {//이미지를 canvas 비율에 맞게 변환
        const modifiedImage = document.createElement('canvas');
        const ctx = modifiedImage.getContext('2d');

        const modifiedWidth = modifiedImage.width = option.size*(img.width/img.height) // 수정된 가로 크기 (이미지 사이즈)
        const modifiedHeight = modifiedImage.height = option.size;

        const X = -(modifiedWidth - option.size) / 1.5; // 이미지 중앙 정렬렬
    
        ctx.drawImage(img, X, 0, modifiedWidth, modifiedHeight);
    
        pattern = ctx.createPattern(modifiedImage, 'repeat'); // 수정된 이미지로 패턴 생성
        
    };

    const draw = () => {
        ctx.clearRect(0, 0, option.size, option.size);
        ctx.beginPath()
        ctx.moveTo(update(0).x, update(0).y);

        Array.from({ length: total-1 }).forEach((_, index) => {
            const {cp1X, cp1Y} = update(index);
            const {x, y, cp2X, cp2Y} = update(index+1);

            ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, x, y );
        });

        ctx.bezierCurveTo(
            update(total-1).cp1X, 
            update(total-1).cp1Y, 
            update(0).cp2X, 
            update(0).cp2Y, 
            update(0).x, 
            update(0).y 
        );
        ctx.closePath();

        switch(option.backgroundStyles) {
            case 'img' :
                ctx.fillStyle = pattern;
                ctx.fill();
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

    const update = (index) => {
        const ratioChange = ((option.size/2) / MaxValue2);//canvas size에 맞게 svg포인트 변환
        const radian = (2*Math.PI) * index / total; //2π*(index/total)
        const wave = Math.sin((Variation+radian * randomWave[index])) * VIBRATION; //(0~1)*(움직임 VIBRATION) //sinθ로 부드럽게

        const prev = (Math.floor(cycle) + index) % total; //lerp 현재 index
        const next = (Math.floor(cycle) + index + 1) % total; //lerp 다음음 index

        const Fx = (index) => InpitSVG.point[index].x;
        const Fy = (index) => InpitSVG.point[index].y;
        const Cp1X = (index) => InpitSVG.cp1[index].x;
        const Cp1Y = (index) => InpitSVG.cp1[index].y;

        const {Radian} = CatchPoint(Fx(index),Fy(index),VIBRATION,MaxValue,ratioChange);
        const {Radian:Radian1_1, Length:Length1_1} = CatchPoint(Fx(prev),Fy(prev),VIBRATION,MaxValue,ratioChange);
        const {Radian:Radian1_2, Length:Length1_2} = CatchPoint(Fx(next),Fy(next),VIBRATION,MaxValue,ratioChange);
        const {Radian:Radian2_1, Length:Length2_1} = CatchPoint(Cp1X(prev),Cp1Y(prev),VIBRATION,MaxValue,ratioChange);
        const {Radian:Radian2_2, Length:Length2_2} = CatchPoint(Cp1X(next),Cp1Y(next),VIBRATION,MaxValue,ratioChange);

        //bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) 에 필요한 좌표 계산
        //x = 빗변길이 * conθ
        //y = 빗변길이 * sinθ
        //(x,y)좌표 (θ값은 변하지않고 길이만 변동)
        const x = (Math.cos(Radian) * (lerp(Length1_1,Length1_2,metronome) + wave)) + Center; // conθ*(빗변길이+wave)
        const y = (Math.sin(Radian) * (lerp(Length1_1,Length1_2,metronome) + wave)) + Center; // sinθ*(빗변길이+wave)

        //(cp1x,cp1y)좌표
        const prevRadian = Radian - (Radian1_1 - Radian2_1);//이전 직선(x,y)와 직선(cp1x,cp1y) 사이의 각도
        const nextRadian = Radian - (Radian1_2 - Radian2_2);//다음 직선(x,y)와 직선(cp1x,cp1y) 사이의 각도
        const cp1X = (Math.cos(lerpAngle(prevRadian, nextRadian,metronome)) * (lerp(Length2_1,Length2_2,metronome) + wave)) + Center; // conθ*(빗변길이+wave)
        const cp1Y = (Math.sin(lerpAngle(prevRadian, nextRadian,metronome)) * (lerp(Length2_1,Length2_2,metronome) + wave)) + Center; // sinθ*(빗변길이+wave)

        //(cp2X,cp2Y)좌표 //점(x,y)를 중심으로 x축,y축 대칭
        const cp2X = 2*x - cp1X;
        const cp2Y = 2*y - cp1Y;


        //움직임 제어 
        Variation = (Variation + (VARIATION_SPPED * randomWave[index])) % (Math.PI * 2); //rotat 무한 증가 방지
        cycle = (cycle + CYCLE_SPEED) % total;
        metronome = (metronome + CYCLE_SPEED) % 1; //lerp를 위한 0~1 반복

        return {x,y,cp1X,cp1Y,cp2X,cp2Y}
    };

    if (option.backgroundStyles === 'img') { // 이미지 로드 오류 방지지
        const img = new Image(); 
        img.src = option.imgSrc; 

        img.onload = () => { 
            imgtransition(img); //이미지 변환환
            setInterval(draw, 15); // 이미지 로드 후 실행행 
        }; 
    } else { 
        setInterval(draw, 15);
    }

};

export default canvasJs