
// wave의 자연스러운 움직임을 위해 index별 랜덤 계수 지정
const RandomWave = (total) => {//
    return Array(total).fill().map(() => Math.floor(Math.random()*3 + 1));
};

//보간 기법 사용용
const lerp = (start, end, t) => start + (end - start) * t; //θ값 부드러운 변환환
const lerpAngle = (start, end, t) => { //θ값이 음수 양수 전환될때 부자연스러운 움직임 해결
    let diff = end - start;
    if (diff >= Math.PI) diff -= 2 * Math.PI;
    if (diff < -Math.PI) diff += 2 * Math.PI;
    return start + diff * t;
}

//좌표값 변환
const CatchPoint = ( x, y, Vibration, MaxValue, ratioChange ) => { //좌표값을 길이, θ로 변환
    const Center = MaxValue/2
    const Length = (Math.sqrt(Math.pow(((x-Center)*ratioChange),2)+Math.pow(((y-Center)*ratioChange),2))) - Vibration;//중심점과 각 점사이의 거리
    const Radian = Math.atan2(y - Center, x - Center);
    return {Length,Radian}
}

//MaxLength 구하기
const maxValue2 = (point) => {
    //가장 먼 값 구하기
    const allPoint = point.flatMap(coord => [coord.x, coord.y]); //모든값 배열에 담기
    const Maxpoint = Math.max(...allPoint);

    //가장 긴 빗변 구하기
    const Center = Maxpoint/2; //(maxpoint,maxpoint) => 중심점
    const allLength = point.flatMap(point => [Math.sqrt(Math.pow(point.x-Center,2)+Math.pow(point.y-Center,2))]);// 모든 직선거리 배열에 담기
    const maxValue = Math.max(...allLength);
    return maxValue

};


export {RandomWave,lerp,lerpAngle,CatchPoint,maxValue2}