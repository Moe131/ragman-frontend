import React, { useState } from "react";
import { Navbar } from "@nextui-org/react";


// button in the navbar, used to navigate through the different sections of the Settings page
const NavbarButton = ({
    label,
    windowLocation,
}: {
    label: string,
    windowLocation: string,
}) => (
    <a className="rounded-md p-3 px-[25px] font-semibold text-white text-lg duration-300 hover:bg-gray-500/10" href={windowLocation}>
        {label}
    </a>
)

// helper for "DropdownBox": accepts a variable number of strings to be listed in the dropdown box
interface DropdownOption {
    id: string,
    label: string,
    link: string,
};

// button located in the navbar; displays a list of links when hovered over
const DropdownButton = ({
    label,
    dropdownOptions,
}: {
    label: string,
    dropdownOptions: DropdownOption[],
}) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    return (
        <div className="relative inline-block text-left mx-[5px]">
            {/* This div defines the button itself and its styles */}
            <div 
                className="pb-2" 
                onMouseOver={() => setIsMenuVisible(true)} 
                onMouseOut={() => setIsMenuVisible(false)} >
                <div className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 font-semibold text-white text-lg shadow-sm duration-300 hover:bg-gray-500/10 items-center" id="menu-button">
                    {label}
                    {/* <svg> tag defines the styles of the down arrow next to the button text */}
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {/* this div defines the list of selectable options that appear when the user hovers over the button */}
            
                <div 
                    id="list" 
                    className={`absolute left-0 w-56 origin-top-right rounded-md bg-gray-500 border-2 border-gray-600 backdrop-blur-sm transition-all duration-250 ${isMenuVisible ? 'visible opacity-100' : 'invisible opacity-0'}`} 
                    role="menu" 
                    onMouseOver={() => setIsMenuVisible(true)} 
                    onMouseOut={() => setIsMenuVisible(false)} 
                    tabIndex={-1}>
                    <div className="py-1" role="none">
                        {   dropdownOptions.map((dropdownOption, index) => 
                                <a key={index} href={dropdownOption.link} className="transition-background duration-100 hover:bg-gray-900/10 block px-4 py-2  text-white text-lg rounded-md" role="menuitem" tabIndex={-1} id={dropdownOption.id} onClick={() => console.log("CLICKED!")}>{dropdownOption.label}</a>
                            )
                        }
                    </div>
                </div>
            
        </div>
    );
};

// A square providing a short description of one AI assistant
const ExploreAssistantSquare =({
    id,
    label,
    text,
    imageSrc,
    link,
}: {
    id: string,
    label: string,
    text: string,
    imageSrc: string
    link: string,
}) => (
    <div id={id} className="mx-[40px] flex flex-col items-center">
        <p className="mb-[10px] text-white">{text}</p>
        <a href={link}>
            <div className="h-[250px] w-[300px] bg-gray-500 rounded-[10px] flex items-center justify-center duration-200 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]" style={{backgroundImage: imageSrc, backgroundSize: 'cover'}}>
                {label}
            </div>
        </a>
    </div>
)


const Landing = () => {
    return (
        <div id="body" className="bg-[#343541] h-100 w-100 flex flex-col relative">
            
            {/* Navbar section holds the the website icon, dropdown buttons, and login/signin buttons */}
            <Navbar shouldHideOnScroll className="py-[10px] justify-between bg-[#000000] bg-opacity-5 backdrop-blur-sm">
                <div id="logoName" className="flex flex-row items-center">
                    <a href="/landing">
                        <div id="icon" className="bg-[#F7B32B] rounded-[50px] w-[50px] h-[50px] mr-[40px]"></div>
                    </a>
                    <p id="zotgpt" className="font-bold text-inherit text-white text-[30px] w-fit">ZotGPT</p>
                </div>
 
                <div id="dropdowns" className="flex flex-row flex-1 pl-[100px] gap-0">
                    <DropdownButton
                        label="Product"
                        dropdownOptions={
                            [
                                {id: 'small', label: 'pr Small', link: '#'},
                                {id: 'medium', label: 'pr Medium', link: '#'},
                                {id: 'large', label: 'pr Large', link: '#'},
                            ]
                        }
                    />

                    <DropdownButton
                        label="Specialized Chats"
                        dropdownOptions={
                            [
                                {id: 'small', label: 'sc Small', link: '#'},
                                {id: 'medium', label: 'sc Medium', link: '#'},
                                {id: 'large', label: 'sc Large', link: '#'},
                            ]
                        }
                    />

                    <DropdownButton
                        label="Open Source"
                        dropdownOptions={
                            [
                                {id: 'small', label: 'op Small', link: '#'},
                                {id: 'medium', label: 'op Medium', link: '#'},
                                {id: 'large', label: 'op Large', link: '#'},
                            ]
                        }
                    />
                </div>

                <a href="/login" className="transition-background duration-300 hover:bg-[#545964] block px-4 py-2  text-white text-lg rounded-md bg-[#2D2F39]" role="menuitem" tabIndex={-1} id="login" onClick={() => console.log("CLICKED!")}>
                    Log In
                </a>
            </Navbar>

            {/* artwork area next to hero section */}
            <div className="m-0 p-0 w-[650px] h-[700px] bg-indigo-500 rounded-l-full block overflow-auto text-center flex items-center justify-center absolute right-0">
                #TODO: Artwork / images here. This div to be transparent
            </div>

            {/* hero section: the title, subtitle, and action buttons */}
            <div id="hero-section" className="ml-[100px] my-[100px] p-0 flex flex-col">
                    <p id="hero-title" className="text-white text-[80px] font-bold">
                        Improved AI Assistance
                    </p>

                    <p id="hero-subtitle" className="text-[#ADADAE] text-[35px] font-semi-bold mt-[40px]">
                        Get the answers you need
                    </p>
                    
                    <a href='/login'>
                        <button className="rounded-md p-3 px-[25px] font-semibold text-white text-lg duration-300 bg-[#297373] hover:bg-[#318787] mt-[100px]">
                            Start Chatting
                        </button>
                    </a>
            </div>
            
            {/* Explore the assistants section: a row of squares each providing a short description of the chatbot */}
            <div id="explore-assistants" className="my-[150px] flex flex-row items-center justify-center ">
                    <ExploreAssistantSquare 
                        id="tax"
                        label="Tax Assistant"
                        text="Filing your taxes?"
                        imageSrc="https://img.pokemondb.net/artwork/large/pikachu.jpg"
                        link="#"
                    />

                    <ExploreAssistantSquare 
                        id="law"
                        label="Law Assistant"
                        text="Explore our Law assistant"
                        imageSrc="https://img.pokemondb.net/artwork/large/pikachu.jpg"
                        link="#"
                    />

                    <ExploreAssistantSquare 
                        id="Maths"
                        label="Maths Assistant"
                        text="Figure out that equation"
                        imageSrc="https://img.pokemondb.net/artwork/large/pikachu.jpg"
                        link="#"
                    />

                    <ExploreAssistantSquare 
                        id="writing"
                        label="Writing Assistant"
                        text="Writing a tricky email?"
                        imageSrc="https://img.pokemondb.net/artwork/large/pikachu.jpg"
                        link="#"
                    />
            </div>

            {/* informational section */}
            <div id="info" className="ml-[100px] my-[100px] p-0 flex flex-col">
                <p id="info-title" className="text-[#FAA916] text-[35px] font-normal">
                    Precise responses for your questions
                </p>
                
                <p id="info-subtitle" className="w-[70vw] text-[#ADADAE] text-[35px] font-normal">
                    Our specialized AI assistants more accurately answer your questions on specific subjects, reducing workload and increasing productivity
                </p>
                
                <div className="flex ml-[100px]">
                    <div id="product-demo" className="h-[700px] w-[1000px] my-[50px] bg-gray-500 rounded-lg">
                            <p className="mt-[20px] ml-[20px] w-[40%]">#TODO: Image here of a chat between user and tax/law/etc assistant, demonstrating its greater specificity than general AI assistants</p>
                    </div>
                    
                    {/* TODO: this div to only appear when the user scrolls down the page to a certain limit */}
                    {/* <div id="product-demo" className="h-[700px] w-[1000px] my-[50px] bg-gray-500 rounded-lg">
                            <p className="mt-[20px] ml-[20px] w-[40%]">#TODO: Image here of a chat between user and tax/law/etc assistant, demonstrating its greater specificity than general AI assistants</p>
                    </div> */}
                </div>
            </div>

            <footer className="bg-[#494A5B] rounded-lg shadow m-4 dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-white sm:text-center dark:text-gray-400">
                        © 2024
                        <a href="#" className="hover:underline"> ZotGPT™</a>
                        . All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
            </footer>

        </div>
    );
};
export default Landing;