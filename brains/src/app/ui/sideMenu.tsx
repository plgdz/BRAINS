// sideMenu.tsx
// Composant qui affiche le menu latéral
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState } from "react";
import Link from "next/link";
import { faWallet, faNoteSticky, faBarsProgress, faPersonRunning, faUser, faCalendarDays, faBrain, faBars } from '@fortawesome/free-solid-svg-icons';
import '../globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider } from "@nextui-org/react";

export default function SideMenuComponent() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Button for small screens to toggle the sidebar */}
            <button
                className="lg:hidden p-4 focus:outline-none absolute top-3 z-50 left-5"
                onClick={toggleMenu}
            >
                <FontAwesomeIcon icon={faBars} />
            </button>

            {/* Overlay */}
            {isOpen ? <div className="fixed top-0 left-0 w-full h-full bg-black opacity-20 z-40" onClick={toggleMenu}></div> : null}

            {/* Sidebar */}
            <aside className={`sidebar text-gray-800 flex-1 border-r border-gray-300 min-h-[100vh] ${isOpen ? 'block absolute z-40' : 'hidden'} lg:block`}>
                <div className="mt-20 md:mt-10">
                    <Link
                        href={"/dashboard"}
                        // @ts-ignore
                        onClick={isOpen ? toggleMenu : null}
                    >
                        <div className="flex items-center m-3">
                            <span className="m-3"><FontAwesomeIcon icon={faBrain} style={{ fontSize: '2.5em' }} /></span>
                            <h2 className="text-3xl font-bold hidden md:block">Brains</h2>
                        </div>
                    </Link>
                    <nav className="sidebar-nav">
                        <ul className="list-none p-0">
                            <li className="py-2">
                                <Link
                                    href="/dashboard/calendar"
                                    // @ts-ignore
                                    onClick={isOpen ? toggleMenu : null}
                                    className="flex items-center text-gray-800 hover:bg-gray-100 p-2 rounded-lg">
                                    <span className="m-3"><FontAwesomeIcon icon={faCalendarDays} style={{ fontSize: '1.25em' }} /></span>
                                    <span className="text-lg hidden md:block">Calendrier</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href="/dashboard/budgets"
                                    // @ts-ignore
                                    onClick={isOpen ? toggleMenu : null}
                                    className="flex items-center text-gray-800 hover:bg-gray-100 p-2 rounded-lg">
                                    <span className="m-3"><FontAwesomeIcon icon={faWallet} style={{ fontSize: '1.25em' }} /></span>
                                    <span className="text-lg hidden md:block">Budgets</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href="/dashboard/notes"
                                    // @ts-ignore
                                    onClick={isOpen ? toggleMenu : null}
                                    className="flex items-center text-gray-800 hover:bg-gray-100 p-2 rounded-lg">
                                    <span className="m-3"><FontAwesomeIcon icon={faNoteSticky} style={{ fontSize: '1.25em' }} /></span>
                                    <span className="text-lg hidden md:block">Notes</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href="/dashboard/projects"
                                    // @ts-ignore
                                    onClick={isOpen ? toggleMenu : null}
                                    className="flex items-center text-gray-800 hover:bg-gray-100 p-2 rounded-lg">
                                    <span className="m-3"><FontAwesomeIcon icon={faBarsProgress} style={{ fontSize: '1.25em' }} /></span>
                                    <span className="text-lg hidden md:block">Projects</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href="/dashboard/workouts"
                                    // @ts-ignore
                                    onClick={isOpen ? toggleMenu : null}
                                    className="flex items-center text-gray-800 hover:bg-gray-100 p-2 rounded-lg">
                                    <span className="m-3"><FontAwesomeIcon icon={faPersonRunning} style={{ fontSize: '1.25em' }} /></span>
                                    <span className="text-lg hidden md:block">Workouts</span>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link
                                    href="/dashboard/profile"
                                    // @ts-ignore
                                    onClick={isOpen ? toggleMenu : null}
                                    className="flex items-center text-gray-800 hover:bg-gray-100 p-2 rounded-lg">
                                    <span className="m-3"><FontAwesomeIcon icon={faUser} style={{ fontSize: '1.25em' }} /></span>
                                    <span className="text-lg hidden md:block">Profile</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}
