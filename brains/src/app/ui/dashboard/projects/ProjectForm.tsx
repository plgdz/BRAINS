// ProjectForm.tsx
// Composant pour afficher un formulaire de projet
// Auteurs : Paul Agudze, Thomas Garneau

'use client';
import React, { useState } from 'react';
import { projectMiddleware } from "@/app/lib/actions/projects";

export function ProjectForm({ toggleModal }: { toggleModal: any }) {
    const [formData, setFormData] = useState({
        projectName: '',
        projectDescription: '',
        projectDeadline: ''
    });

    const [validDate, setValidDate] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!formData.projectName || !formData.projectDescription || !formData.projectDeadline || validDate) {
            return;
        }
        projectMiddleware('create', formData);
        toggleModal();
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value < new Date().toISOString().split('T')[0]) {
            setValidDate('Vous devez choisir une date ultérieure à aujourd\'hui');
            return;
        } else {
            setValidDate('');
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"> {/* Overlay */}
            <div className="relative w-full max-w-md mx-auto bg-blue-500 rounded-xl p-8"> {/* Modal Container */}
                <div className="flex justify-center">
                    <h1 className="text-3xl text-white">New Project</h1>
                </div>
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="flex justify-center">
                        <input
                            type="text"
                            className="w-full h-12 rounded-md p-4 text-gray-700"
                            placeholder="Project Name"
                            name="projectName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-center">
                        <input
                            type="text"
                            className="w-full h-12 rounded-md p-4 text-gray-700"
                            placeholder="Project Description"
                            name="projectDescription"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-center">
                        <input
                            type="date"
                            className="w-full h-12 rounded-md p-4 text-gray-700"
                            name="projectDeadline"
                            onChange={handleDateChange}
                        />
                        {validDate && <p className="text-red-500 text-center mt-2">{validDate}</p>}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded w-1/2"
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}