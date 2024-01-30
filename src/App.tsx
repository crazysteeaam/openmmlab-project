import React, {useState, useEffect} from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import xlsxUrl from './assets/OpenMMLab.xlsx?url'
import ProjectCard from './components/ProjectCard';
import Modal from './components/Model';

export type Project = {
    name: string;
    title: string;
    author: string;
    intro: string;
    repo: string;
    link: string;
    github?: string;
    paper?: string;
    app?: string;
    image?: string;
};

const App: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [modalProject, setModalProject] = useState<Project | null>(null);

    useEffect(() => {
        loadExcel(xlsxUrl);
    }, []);

    const loadExcel = async (url: NonNullable<unknown>) => {
        try {
            // 从 url 获取 Excel 文件
            const response = await fetch(url as string);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.readAsBinaryString(blob);
            // 读取 Excel 文件
            reader.onload = () => {
                const workbook = XLSX.read(reader.result as string, {type: 'binary'});
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(sheet);
                setProjects(data as Project[]);
            }
        } catch (error) {
            console.error('Error loading the Excel file:', error);
        }
    };

    const showModal = (project: Project) => {
        setModalProject(project);
    };

    const hideModal = () => {
        setModalProject(null);
    };

    return (
        <div>
            <div className="title-block">
                <h1 id="mainTitle">OpenMMLab Projects</h1>
                <p className="project-description">
                    🚀 Explore Projects Powered by OpenMMLab, Ignite the Future of Generative Innovation! From Text to
                    Image, Image to Image,
                    Unveiling a New Chapter in Intelligent Creation! 🧙
                </p>
            </div>

            <div className="cards-container">
                {projects
                    // 有project.image优先，其次有paper第二优先
                    .sort((a, _) => (a.image ? -1 : a.paper ? -1 : 1))
                    .map(project => (
                        <ProjectCard key={project.name} project={project} onShowModal={showModal}/>
                    ))}
            </div>

            {modalProject && (
                <>
                    <Modal project={modalProject}/>
                    <div className="modal-overlay" onClick={hideModal}></div>
                </>
            )
            }

        </div>
    )
        ;
};

export default App;