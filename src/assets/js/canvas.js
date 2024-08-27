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
    const PointSpeed = 0.001; //point속도 제어
    const rotationSpeed = 0.0001; //축 회전속도 제어

    //변동상수
    let angle = 0;
    let rotat = 0;

    //임시
    const L = 100; //반지름
<path d="M428.418 134.539C336.919 127.286 311.417 44.5392 261.918 17.0392C212.419 -10.4608 97.418 -11.4606 28.918 69.0391C-39.582 149.539 36.9173 187.54 53.4179 299.539C69.9186 411.539 33.4171 439.539 89.418 473.539C145.419 507.54 221.417 514.039 261.918 512.539C302.419 511.039 381.917 505.039 437.918 481.039C493.919 457.04 585.418 406.54 585.918 299.539C586.418 192.539 519.917 141.792 428.418 134.539Z" fill="#D9D9D9"/>

    
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath()
        Array.from({ length: total }).forEach((_, index) => {
            ctx.arc(update(index).x, update(index).y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "black";//임시
            ctx.fill();
            ctx.closePath();
        });
        
        //임시
        ctx.beginPath()
        ctx.arc(canvas.width/2, canvas.height/2, L, 0, 2 * Math.PI);
        ctx.strokeStyle = "red";
        ctx.stroke()
        ctx.closePath();

        ctx.beginPath()
        Array.from({ length: total }).forEach((_, index) => {
            ctx.moveTo(canvas.width/2, canvas.height/2);
            ctx.lineTo(CentserX + ((L+limit)*Math.cos((2*Math.PI / total *index)+rotat)), CentserY + ((L+limit)*Math.sin((2*Math.PI / total *index)+rotat)));
        });
        ctx.stroke()
        ctx.closePath();

        ctx.beginPath()
        Array.from({ length: total }).forEach((_, index) => {
            ctx.moveTo(update(index).cp2X, update(index).cp2Y);
            ctx.lineTo(update(index).cp1X, update(index).cp1Y);
        });
        ctx.strokeStyle = "green";
        ctx.stroke()
        ctx.closePath();

        ctx.beginPath()
        ctx.moveTo(update(0).x, update(0).y);
        Array.from({ length: total }).forEach((_, index) => {
            ctx.bezierCurveTo(update(index).cp1X, update(index).cp1Y, update(index+1).cp2X, update(index+1).cp2Y, update(index+1).x, update(index+1).y );
        });
        ctx.bezierCurveTo(update(total).cp1X, update(total).cp1Y, update(0).cp2X, update(0).cp2Y, update(0).x, update(0).y );
        ctx.stroke()
        ctx.closePath();

        
// 시작점

ctx.beginPath();
ctx.moveTo(468, 146);
ctx.bezierCurveTo(376, 138, 351, 56, 302, 28);
ctx.bezierCurveTo(252, 1, 137, 0, 69, 80);
ctx.bezierCurveTo(0, 160, 77, 199, 93, 311);
ctx.bezierCurveTo(110, 423, 73, 451, 129, 485);
ctx.bezierCurveTo(185, 519, 261, 525, 302, 524);
ctx.bezierCurveTo(342, 522, 422, 516, 478, 492);
ctx.bezierCurveTo(534, 468, 625, 417, 626, 311);
ctx.bezierCurveTo(626, 204, 560, 153, 468, 146);
ctx.closePath();
ctx.stroke()

ctx.beginPath();
ctx.arc(468, 146, 3, 0, 2 * Math.PI);
ctx.closePath();
ctx.arc(302, 28, 3, 0, 2 * Math.PI);
ctx.closePath();
ctx.arc(69, 80, 3, 0, 2 * Math.PI);
ctx.closePath();
ctx.arc(93, 311, 3, 0, 2 * Math.PI);
ctx.closePath();
ctx.arc(129, 485, 3, 0, 2 * Math.PI);
ctx.closePath();
ctx.arc(302, 524, 3, 0, 2 * Math.PI);
ctx.closePath();
ctx.arc(478, 492, 3, 0, 2 * Math.PI);
ctx.closePath();
ctx.arc(626, 311, 3, 0, 2 * Math.PI);
ctx.closePath();
ctx.arc(468, 146, 3, 0, 2 * Math.PI);
ctx.closePath();
ctx.fillStyle = "red";//임시
ctx.fill();

ctx.beginPath();
ctx.moveTo(351, 56);
ctx.lineTo(252, 1);
ctx.moveTo(137, 0);
ctx.lineTo(0, 160);
ctx.moveTo(77, 199);
ctx.lineTo(110, 423);
ctx.moveTo(73, 451);
ctx.lineTo(185, 519);
ctx.moveTo(261, 525);
ctx.lineTo(342, 522);
ctx.moveTo(422, 516);
ctx.lineTo(534, 468);
ctx.moveTo(625, 417);
ctx.lineTo(626, 204);
ctx.moveTo(560, 153);
ctx.lineTo(376, 138);
ctx.closePath();
ctx.strokeStyle = "blue";
ctx.stroke()
const aaa = {
    // point:{
    //     x:[468,302,69,93,129,302,478,626,468],
    //     y:[146,28,80,311,485,524,492,311,146]
    // },
    // cp1:{
    //     x:[351,137,77,73,261,422,625,560],
    //     y:[56,0,199,451,525,516,417,153]
    // },
    // cp2:{
    //     x:[252,0,110,185,342,534,626,376],
    //     y:[1,160,423,519,522,468,204,138]
    // },
    point:[
        {x:468 ,y:146},{x:302 ,y:28},{x:69 ,y:80},{x:93 ,y:311},{x:129 ,y:485},{x:302 ,y:524},{x:478 ,y:492},{x:626 ,y:311}
    ],
    cp1:[
        {x:351 ,y:56},{x:137 ,y:0},{x:77 ,y:199},{x:73 ,y:451},{x:261 ,y:525},{x:422 ,y:516},{x:625 ,y:417},{x:560 ,y:153}
    ],
    cp2:[
        {x:252 ,y:1},{x:0 ,y:160},{x:110 ,y:423},{x:185 ,y:519},{x:342 ,y:522},{x:534 ,y:468},{x:626 ,y:204},{x:376 ,y:138}
    ],
    
}
// aaa.point.map((item)=>{
//     console.log(Math.sqrt(Math.pow(item.x-CentserX)+Math.pow(item.y-CentserY)))
// })

    };

    const update = (index) => {
        //직각 삼각형의 좌표평면상 점(x,y)를 구하는 공식을 사용하여 함수 실행
        //x = 빗변길이 * conθ
        //y = 빗변길이 * sinθ


        const radian = 2*Math.PI * index / total; //2π*(index/total)
        let wave = Math.sin(angle+radian) * limit; //(0~1)*(움직임 반경) //sinθ로 부드럽게

        //(x,y)좌표 축 계산
        let FixedX = CentserX + (L * Math.cos(radian)); //+rotat 축 회전(점θ 회전에는 영향을 주지않음)
        let FixedY = CentserY + (L * Math.sin(radian)); //+rotat 축 회전(점θ 회전에는 영향을 주지않음)

        //(x,y)좌표 계산
        let x = FixedX + Math.cos(radian) * wave; //+rotat 점θ 회전(축 회전에는 영향을 주지않음)
        let y = FixedY + Math.sin(radian) * wave; //+rotat 점θ 회전(축 회전에는 영향을 주지않음)

        //(cpX,cpY)좌표 축 계산
        let FixedCpX = CentserX + ((L+20) * Math.cos(radian+0.5));
        let FixedCpY = CentserY + ((L+20) * Math.sin(radian+0.5));

        //(cp1X,cp1Y)좌표 계산
        let cp1X = FixedCpX + Math.cos(radian) * wave;
        let cp1Y = FixedCpY + Math.sin(radian) * wave;
        
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