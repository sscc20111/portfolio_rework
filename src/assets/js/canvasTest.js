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

    // Add lever (slider)
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = canvas.height.toString();
    slider.value = CenterY.toString();
    container.appendChild(slider);

    let test = 0;
    const update = (index) => {
        let x = CenterX + test +parseFloat(slider.value);
        let y = parseFloat(slider.value); // Get y position from slider value
        console.log(x);

        test += 0.05;
        return { x, y };
    };

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const { x, y } = update();
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    };

    setInterval(draw, 15);
};

export default canvasTestJs;
