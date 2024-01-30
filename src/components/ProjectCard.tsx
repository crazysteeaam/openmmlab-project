// ProjectCard.tsx
import React from 'react';
import {Project} from '../App';

const ProjectCard: React.FC<{ project: Project; onShowModal: (project: Project) => void }> = ({
                                                                                                  project,
                                                                                                  onShowModal
                                                                                              }) => {
    const colorList = ['linear-gradient(to right, #a8c0ff, #3f2b96)', 'linear-gradient(to right, #a8c0ff, #ff0000)', 'linear-gradient(to right, #a8c0ff, #000000)', 'linear-gradient(to right, #0000ff, #3f2b96)', 'linear-gradient(to right, #000000, #013220)', 'linear-gradient(to right, #000000, #ffa500)'];

    return (
        <div className="card">
            <div className="project-image"
                // 如果有图片，就显示图片，否则显示渐变色
                 style={{backgroundImage: project.image ? `url(${project.image})` : colorList[Math.floor(Math.random() * colorList.length)]}}>
                {project.image ? '' : project.name}
            </div>
            <div className="project-name" onClick={() =>
                // 如果有project.paper，显示modal
                project.paper ? onShowModal(project) : window.open(project.app, '_blank')
            }>
                {/*如果超过一行，就显示省略号，否则显示全部文字*/}
                {project.name.length > 24 ? project.name.slice(0, 24) + '...' : project.name}
            </div>
            <div className="project-repo">Powered By {project.repo}</div>
            <div className="icons">
                {project.github && (
                    <a className="icon" href={project.github} target="_blank" rel="noopener noreferrer">🔗 GitHub</a>
                )}
                {project.paper && (
                    <a className="icon" href={project.paper} target="_blank" rel="noopener noreferrer">📄 Paper</a>
                )}
                {project.app && (
                    <a className="icon" href={project.app} target="_blank" rel="noopener noreferrer">📱 App</a>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
