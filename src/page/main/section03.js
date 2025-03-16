import { useEffect, useState } from 'react';

import { getProjectsData } from "./components/projects_data";


const ProjectSection = () => {
    const [Focus,setFocus] = useState({project: 'toyProjects', title: 'todo_list'});
        useEffect(()=>{
            const test = Focus.project
            console.log(getProjectsData);
            console.log(Object.keys(getProjectsData[0])[0]);
        },[Focus]);

    return(<>
    <div className="leftBox">
        <h2>Projects List</h2>
        {getProjectsData.map((project, index) => (
            Object.keys(project).map((item) => (
                <div className={item} key={index}>
                    <h3>( {item} )</h3>
                    <ul>
                        {project[item].map((project, index) => (
                            <li key={index}>
                                <p onClick={() => setFocus(project.title)} className={Focus.title=== project.title ? 'focus' : ''}>
                                    <span className="bullet"></span>
                                    {project.title}
                                </p>
                                <span className="fillBar"></span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))
        ))}
    </div>
    <div className="rightBox">
        <h2>Projects View</h2>
        <div className="viewBox">
            <div className="thumbnailBox">
                {}
            </div>
            <div className="infoWrap">
                <h4>{}</h4>
                <ul className='info_desc'>
                    {/* {getProjectsData(viewTarget).desc.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <ul className='info_skills'>
                    {getProjectsData(viewTarget).skills.map((item, index) => (
                        <li key={index}>#{item}</li>
                    ))} */}
                </ul>
            </div>
        </div>
    </div>
    </>)

};

export default ProjectSection