import { useEffect, useState } from "react";

const canvasTestJs = (selector, option) => {
    const container = document.querySelector(selector);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    //setting
    canvas.width = canvas.height = option.size;
    const CenterX = canvas.width / 2;  //중심 x
    const CenterY = canvas.height / 2; //중심 y

    const value = {x:300,y:150}

    let test = Math.PI;

    const CatchPoint = ( x, y ) => {
        const Length = Math.sqrt(Math.pow(x-CenterX,2)+Math.pow(y-CenterY,2))
        const 라디안 = Math.atan((y-CenterY)/(x-CenterX))
        return {Length,라디안}
    }

    const update = (index) => {
        test = (test+0.1);
        const {Length,라디안} = CatchPoint(value.x, value.y)
        let x = Math.cos(라디안*test)*Length + CenterX;
        let y = Math.sin(라디안*test)*Length + CenterX;

        return { x, y };
    };

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(0,CenterY);
        ctx.lineTo(canvas.width,CenterY)
        ctx.closePath();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(CenterX,0);
        ctx.lineTo(CenterX,canvas.height)
        ctx.closePath();
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(value.x, value.y, 5, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();

        const { x, y } = update();
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

    };

    setInterval(draw, 15);
};

export default canvasTestJs;
