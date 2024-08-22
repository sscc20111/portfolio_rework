const canvasJs = (selecter, option) => {
    const container = document.querySelector(selecter);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    //setting
    canvas.width = canvas.height = option.size;
    ctx.fillStyle = "white";//임시
    const total = 5;


    //변동상수
    let angle = 0;

    const draw = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath()
        Array.from({ length: total }).forEach((_, index) => {
            ctx.arc(canvas.width*(index)/(total-1), update(index), 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        });


    };

    const update = (index) => {
        let y = canvas.height/2; //변동 y
        const FixY = canvas.height/2; //고정 y
        
        const limit = 100; //움직임 반경
        const speed = 0.01; //속도 제어
        
        //y = 시작점 + 변화값(+index로 각 점의 시작점 차등분배) + 최대범위
        y = FixY + (Math.sin(angle+(index)) * limit); 
        angle += speed;
        
        //angle 무한 증가 방지
        if (angle >= Math.PI * 2) {
            angle -= Math.PI * 2;
        }
        return y
    };

    setInterval(draw, 15);
};

export default canvasJs