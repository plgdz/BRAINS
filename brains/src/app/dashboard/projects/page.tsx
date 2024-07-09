'use client';
import React from 'react';
import { useState } from 'react';
import {ProjectsDisplay} from "@/app/ui/dashboard/projects/ProjetWrapper";

export default function Projects(): React.ReactNode {

    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    const handleProjectClick = (projectId : number) => {	
        console.log(`Project ${projectId} clicked`);
    };

    return (
        <div className="relative min-h-screen"> {/* Ensures full screen height and a relative container for positioning */}
            <ProjectsDisplay />
        </div>
    );
};




