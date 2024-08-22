const canvasJs = (selecter, option) => {
    const container = document.querySelector(selecter);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    //setting
    canvas.width = canvas.height = option.size;
    ctx.fillStyle = "white";//임시


    //변동상수
    let angle = 0;
    let y = canvas.height/2


    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath()
        ctx.arc(canvas.width/2, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        update();
    };

    const update = () => {
        const limit = 100; //움직임 반경
        const speed = 0.05;

        y = canvas.height/2 + Math.sin(angle) * limit; //y = 시작점 + 변동값
        angle += speed;

        //angle 무한 증가 방지
        if (angle >= Math.PI * 2) {
            angle -= Math.PI * 2;
        }
    };

    setInterval(draw, 15);
};

export default canvasJs