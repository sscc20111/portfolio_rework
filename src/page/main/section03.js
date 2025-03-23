import { useEffect, useState } from 'react';

import { getProjectsData } from "./components/projects_data";


const ProjectSection = () => {
    const [Focus,setFocus] = useState({project: 'toyProjects', title: 'todo_list'});
    const ViewItem = getProjectsData[Focus.project].filter(project => project.title === Focus.title )[0];

    return(<>
    <div className="leftBox">
        <h2>Projects List</h2>
        {Object.keys(getProjectsData).map((item,index)=>(
            <div className={item} key={index}>
                <h3>( {item} )</h3>
                <ul>
                    {getProjectsData[item].map((project, index) => (
                        <li key={index}>
                            <p onClick={() => setFocus({project: item, title: project.title})} className={Focus.title=== project.title ? 'focus' : ''}>
                                <span className="bullet"></span>
                                {project.title}
                            </p>
                            <span className="fillBar"></span>
                        </li>
                    ))}
                </ul>
            </div>
    ))}
    </div>
    <div className="rightBox">
        <h2>Projects View</h2>
        <div className="viewBox">
            <div className="thumbnailBox">
                <img src={ViewItem.source}></img>
            </div>
            <div className="infoWrap">
                <h4>{ViewItem.title}</h4>
                <ul className='info_desc'>
                    {ViewItem.desc.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <ul className='info_skills'>
                    {ViewItem.skills.map((item, index) => (
                        <li key={index}>#{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    </>)

};

export default ProjectSection