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
    // cp2:[
    //     {x:351 ,y:56},
    //     {x:137 ,y:0},
    //     {x:77 ,y:199},
    //     {x:73 ,y:451},
    //     {x:261 ,y:525},
    //     {x:422 ,y:516},
    //     {x:625 ,y:417},
    //     {x:560 ,y:153}
    // ],
}

const maxValue = () => {
    // x와 y 값을 한 배열에 모음
    const allCoords = InpitSVG.point.flatMap(coord => [coord.x, coord.y]);

    // 가장 큰 값 구하기
    const maxValue = Math.max(...allCoords);
    console.log('test')

    return maxValue

};

export {InpitSVG, maxValue}
