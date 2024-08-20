export const getProjectsData = () => {
    const ToyProjects = (project) => {
        switch (project) {
            case 'Todo-List': return {
                link:'https://sscc20111.github.io/todolist/',
                source:require('../../assets/img/todo.png'),
                title:'todo_list',
                desc: ['로컬스토리지 데이터 저장관리', 'todo-list, 그림 그리기 기능 구현', '기존 todo-list를 react로 변환, 클론코딩 해보았습니다.'],
                skills: ['React.js', 'JavaScript']
            };
            case 'CardGame': return {
                link:'https://sscc20111.github.io/cardgame/',
                source:require('../../assets/img/cardGame.png'),
                title:'Card Game',
                desc: ['같은 그림찾기 게임을 만들어보았습니다.'],
                skills: ['React.js', 'JavaScript']
            };
            case 'CulturalLife': return {
                link:'CulturalLife',
                source:require('../../assets/img/cardGame.png'),
                title:'Cultural Life',
                desc: ['오픈API를 이용한 어플 구현'],
                skills: ['React.js', 'JavaScript', 'RESTfull API']
            };
            default: return [
                'Todo-List',
                'CardGame',
                'CulturalLife',
            ];
        }
    }

    const MyProjects = (project) => {
        switch (project) {
            case 'canvas': return {
                link:'/',
                source:require('../../assets/img/canvas.png'),
                title:'canvas.js',
                desc:['수학식을 사용하여 물이 출렁이는듯한 움직임 구현', '커스터마이징 옵션구현'],
                skills: ['JavaScript']
            };
            case 'GuestBook': return {
                link:'/guestbook',
                source:require('../../assets/img/GuestBook.png'),
                title:'GuestBook',
                desc:['mysql을 이용한 데이터 상태 관리', 'gsap-flip을 사용한 모션 구현', 'login기능과 연동하여 글작성 및 수정, 삭제 권한 구현'],
                skills: ['React.js', 'php', 'mysql', 'gsap-flip']
            };
            default: return [
                'canvas',
                'GuestBook',
            ];
        }
    }

    const ProjectImport = (project) => {
        switch (project) {
            case 'Todo-List':
            case 'CardGame':
            case 'CulturalLife': 
                return ToyProjects(project);
            
            case 'canvas':
            case 'GuestBook': 
                return MyProjects(project);
        }
    }

    return {ToyProjects, MyProjects, ProjectImport}
};
