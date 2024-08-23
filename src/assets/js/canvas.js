const canvasJs = (selecter, option) => {
    const container = document.querySelector(selecter);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    //setting
    canvas.width = canvas.height = option.size;
    const CentserX = canvas.width/2;  //중심 x
    const CentserY = canvas.height/2; //중심 y

    const total = 10; //point 개수
    const limit = 30; //움직임 반경
    const PointSpeed = 0.002; //point속도 제어
    const rotationSpeed = 0.0003; //축 회전속도 제어

    //변동상수
    let angle = 0;
    let rotat = 0;

    //임시
    const L = 100; //반지름

    
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
    };

    const update = (index) => {
        //직각 삼각형의 좌표평면상 점(x,y)를 구하는 공식을 사용하여 함수 실행
        //x = 빗변길이 * conθ
        //y = 빗변길이 * sinθ


        const radian = 2*Math.PI * index / total; //2π*(index/total)
        let wave = Math.sin(angle+radian) * limit; //(0~1)*(움직임 반경) //sinθ로 부드럽게

        //(x,y)좌표 축 계산
        let FixedX = CentserX + (L * Math.cos(radian+rotat)); //+rotat 축 회전(점θ 회전에는 영향을 주지않음)
        let FixedY = CentserY + (L * Math.sin(radian+rotat)); //+rotat 축 회전(점θ 회전에는 영향을 주지않음)

        //(x,y)좌표 계산
        let x = FixedX + Math.cos(radian+rotat) * wave; //+rotat 점θ 회전(축 회전에는 영향을 주지않음)
        let y = FixedY + Math.sin(radian+rotat) * wave; //+rotat 점θ 회전(축 회전에는 영향을 주지않음)

        //움직임 제어
        angle += PointSpeed;
        rotat += rotationSpeed;

        //angle, rotat 무한 증가 방지
        if (angle >= Math.PI * 2) {
            angle -= Math.PI * 2;
        }
        if (rotat >= Math.PI * 2) {
            rotat -= Math.PI * 2;
        }
        return {x,y}
    };

    setInterval(draw, 15);
};

export default canvasJs