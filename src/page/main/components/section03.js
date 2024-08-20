import { useEffect, useState } from 'react'

import { getProjectsData } from '../assets/js/projectsData'

const ListComponents = ({ProjectList, SelectItem, SelectSet}) => {
    const buttonEnter = (e) => {
        e.currentTarget.classList.add('active')
    }
    const bottonLeave = (e) => {
        e.currentTarget.classList.remove('active')
    }
    const handleSelect = (item) => {
        SelectSet(item)
    }

    return(
    <>
        <ul>
            {ProjectList.map((item, index) => (
                <li key={index} >
                    <button 
                    onMouseEnter={buttonEnter} 
                    onMouseLeave={bottonLeave} 
                    onClick={()=>handleSelect(item)}
                    className={SelectItem == item ? 'select' : ''}
                    >
                        <span className="bullet"></span>
                        <p>{item}</p>
                        <span className="line"></span>
                    </button>
                </li>
            ))}
        </ul>

    </>
    )
}

const ProjectSection = () => {
    const [SelectProject, setSelectProject] = useState('Todo-List');// list bullet active 활성화 

    //ProjectsData.js 에서 불러옴
    const ToyProject = (item) => getProjectsData().ToyProjects(item);//toyProjects에 해당하는 list를 불러옴
    const MyProject = (item) => getProjectsData().MyProjects(item);//myProjects에 해당하는 list를 불러옴
    const ProjectTarget = (item) => getProjectsData().ProjectImport(item);//projects 전체에서 각 해당하는 list를 불러옴

    useEffect(()=>{
    },[])

    return(
    <>
        <div className="listWrap">
            <h2>Projects List</h2>
            <div className="toyProjects">
                <h3>( toyProjects )</h3>
                <ListComponents ProjectList={ToyProject()} SelectItem={SelectProject} SelectSet={setSelectProject}></ListComponents>
            </div>
            <div className="myProjects">
                <h3>( myProjects )</h3>
                <ListComponents ProjectList={MyProject()} SelectItem={SelectProject} SelectSet={setSelectProject}></ListComponents>
            </div>
        </div>
        <div className="viewWrap">
            <h2>Projects View</h2>
            <div className="viewBox">
                <div className="thumbnailBox">
                    <a target='_blank'>
                        <img src={ProjectTarget(SelectProject).source}></img>
                    </a>
                </div>
                <div className="infoWrap">
                    <h4>{ProjectTarget(SelectProject).title}</h4>
                    <ul className='info_desc'>
                        {ProjectTarget(SelectProject).desc.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <ul className='info_skills'>
                        {ProjectTarget(SelectProject).skills.map((item, index) => (
                            <li key={index}>#{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </>
    )
}

export default ProjectSection