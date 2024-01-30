// Modal.tsx
import React from 'react';
import { Project } from '../App';

const Modal: React.FC<{ project: Project}> = ({ project }) => {
    return (
        <>
            <div className="modal">
                <div className="modal-title">{project.title}</div>
                <div className="modal-author">{project.author}</div>
                <div className="modal-abstract-title">Abstract</div>
                <div className="modal-content">{project.intro}</div>
            </div>
        </>
    );
};

export default Modal;
