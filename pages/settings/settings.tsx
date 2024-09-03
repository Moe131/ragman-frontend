import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const NavbarButton = ({  // button in the navbar, used to navigate through the different sections of the Settings page
    clickHandler,
    formSection,
}: {
    clickHandler: (arg: string) => void,  // TODO: accept function
    formSection: FormSectionType,
}) => (
    <button type="button" className="rounded-md p-3 text-white duration-300 hover:bg-gray-500/10" onClick={() =>     clickHandler(formSection.id)}>
        {formSection.label}
    </button>

)

const TextBoxFormRow = ({  // text box with label
    formSection, 
    placeholder,
    required,
    label,
    type,
}: {
    formSection: FormSectionType, 
    placeholder: string,
    required: boolean,
    label: string,
    type: string,
}) => (
    <div className="mb-4">
        <label htmlFor={formSection.id} className="block mb-2 text-sm font-medium text-white dark:text-white">
            {label}
        </label>
        <input 
            type={type} 
            id={formSection.id} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
            placeholder={placeholder} 
            required={required} 
        />
    </div>
)

const Button = ({  // button at the bottom of each individual section to be clicked when users want to update a setting in a specific section
    buttonType,
    placeholder,
    clickHandler,
}: {
    buttonType: 'button' | 'submit' | 'reset' | undefined,
    placeholder: string,
    clickHandler: () => void,  // TODO: accept function
}) => (
        <button type={buttonType} onClick={clickHandler} className="w-[190px] rounded-md border border-white/20 p-3 text-white duration-300 hover:bg-gray-500/10">
            {placeholder}
        </button>
)

const Toggle = ({  // toggle button, slides left to right to denote 'yes/no' or 'option 1/option 2'
    formId,
    placeholder,
}: {
    formId: string,
    placeholder: string
}) => (
    <div className="flex flex-direction-col items-center justify-between mb-2">
        <label htmlFor={formId} className="block w-[200px] text-sm font-medium text-white">
                {placeholder}
        </label>
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-500 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
    </div>
)

interface DropdownOption {
    value: string,
    label: string,
};

const DropdownBox = ({  // TODO: figure out how to take and display a variable number of dropdown options
    formId,
    labelText,
    dropdownOptions,
}: {
    formId: string,
    labelText: string,
    dropdownOptions: DropdownOption[],
}) => (
    // <div className="flex flex-direction-col w-fit">
    //     <label htmlFor={formId} className="block text-sm font-medium text-white w-[200px] mr-[25px] flex items-center">
    //         {labelText}
    //     </label>
    //     <select name="languages" id="languages" className="text-white w-[150px] bg-[#343541] p-2 border border-white/20 rounded-lg duration-300 hover:bg-gray-500/10 outline-none">
    //     {   dropdownOptions.map((dropdownOption) => 
    //             <option value={dropdownOption.value}>{dropdownOption.label}</option>
    //         )
    //     }
    //     </select>
    // </div>
    <div className="flex flex-direction-col justify-between">
        <label htmlFor={formId} className="block text-sm font-medium text-white w-[200px] mr-[25px] flex items-center">
            {labelText}
        </label>
        <select name={`${formId}-${labelText}`} className="text-sm font-medium text-white w-[150px] bg-[#343541] p-2 border border-white/20 rounded-lg duration-300 hover:bg-gray-500/10 outline-none">
            {   dropdownOptions.map((dropdownOption) => 
                    <option value={dropdownOption.value}>{dropdownOption.label}</option>
                )
            }
        </select>
    </div>
)

function scrollToElement(elementId: any) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

interface FormSectionType {
    id: string,
    label: string,
}

const FORM_SECTIONS = {
    ACCOUNT_FORM: {
        id: 'account-form',
        label: 'Account',
    },
    ACCESSIBLITY_FORM: {
        id: 'accessibility-form',
        label: 'Accessibility',
    },
    ARCHIVED_CHATS_FORM: {
        id: 'archived-chats-form',
        label: 'Archived chats',
    },
    ADDITIONAL_SETTINGS_FORM: {
        id: 'additional-settings-form',
        label: 'Additional settings'
    },
}

const Settings = () => {
    const getNewMap = (target: string) => 
        new Map<string, string>(
            Object.values(FORM_SECTIONS).map(section => [section.id, section.id === target ? 'bg-gray-500/10' : '']));
    const [flashClass, setFlashClass] = useState<Map<string, string>>(getNewMap(''));
    const handleNavButtonClick = (formSectionId: string) => {
        setFlashClass(getNewMap(formSectionId));
        setTimeout(() => setFlashClass(getNewMap('')), 1000);
    }
    const updateAccountSettings = () => {
        console.log('TODO: update account settings');
    };
    const updateAccessibilitySettings = () => {
        console.log('TODO: update accessibility settings');
    };
    const handleDeleteAccount = () => {
        console.log('TODO: delete account');
    };

    return (
        <div className="bg-[#343541] size-full flex flex-col">
            <p className="text-white text-5xl mt-12 ml-12 mb-4">
                Settings
            </p>
            {/* Navbar: contains buttons to navigate through various Settings pages (account page, notifications, etc */}
            <div className="ml-10 border-b-2 w-fit"> 
                { Object.values(FORM_SECTIONS).map(formSection => 
                        <NavbarButton formSection={formSection} clickHandler={handleNavButtonClick} key={formSection.id} />)
                }
            </div>
            
            {/* Box that holds the multiple Settings options ('change name/email' in 'account', 'email preferences' in 'notifications', etc) */}
            <div className="mx-10 my-4">
                <form  // 'Account' section
                    id={FORM_SECTIONS.ACCOUNT_FORM.id} 
                    className={`p-2 rounded-lg mb-10 w-[650px] duration-300 ${flashClass.get(FORM_SECTIONS.ACCOUNT_FORM.id)}`}
                >
                    <TextBoxFormRow label='First Name' formSection={FORM_SECTIONS.ACCOUNT_FORM} placeholder='John' required={true} type={'text'} />
                    <TextBoxFormRow label='Last Name' formSection={FORM_SECTIONS.ACCOUNT_FORM} placeholder='Doe' required={true} type={'text'} />
                    <TextBoxFormRow label='Email address' formSection={FORM_SECTIONS.ACCOUNT_FORM} placeholder='john.doe@company.com' type='email' required={true} />
                    <Button buttonType="submit" placeholder="Update" clickHandler={updateAccountSettings} />
                </form>

                <form  // 'Accessibility' section
                    id={FORM_SECTIONS.ACCESSIBLITY_FORM.id} 
                    className={`p-2 rounded-lg mb-10 w-[650px] flex flex-col duration-300 space-y-2 ${flashClass.get(FORM_SECTIONS.ACCESSIBLITY_FORM.id)}`}
                >
                    <Toggle formId="inverted-colors" placeholder="Dark Mode"/>
                    <Toggle formId="inverted-colors" placeholder="Large Mouse Cursor"/>
                    <DropdownBox 
                        formId={FORM_SECTIONS.ACCESSIBLITY_FORM.id} 
                        labelText="Display Size" 
                        dropdownOptions={
                            [
                                {label: 'Small', value: 'small'},
                                {label: 'Medium', value: 'medium'},
                                {label: 'Large', value: 'large'},
                            ]
                        }
                    />

                    <div className="flex flex-direction-col justify-between">
                    <label htmlFor="language" className="block text-sm font-medium text-white w-[200px] mr-[25px] flex items-center">
                            Select language
                        </label>
                        <select name="languages" id="languages" className="text-sm font-medium text-white w-[150px] bg-[#343541] p-2 border border-white/20 rounded-lg duration-300 hover:bg-gray-500/10 outline-none">
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                            <option value="arabic">Arabic</option>
                        </select>
                    </div>
                    <Button buttonType="submit" placeholder="Update" clickHandler={updateAccessibilitySettings} />
                </form>

                <form  // 'Archived Chats' section
                    id={FORM_SECTIONS.ARCHIVED_CHATS_FORM.id} 
                    className={`p-2 rounded-lg mb-10 w-[650px] flex flex-col duration-300 space-y-2 ${flashClass.get(FORM_SECTIONS.ARCHIVED_CHATS_FORM.id)}`}
                >
                    <div className="flex flex-direction-row items-center justify-between text-sm font-medium text-white">
                        <p>Calculate speed of vehicles approaching each other</p>
                        <button type="button" className="w-[100px] rounded-md border border-white/20 p-3 text-white duration-300 hover:bg-gray-500/10">
                            Restore
                        </button>
                    </div>
                    <div className="flex flex-direction-row items-center justify-between text-sm font-medium text-white">
                        <p>How to center items along different axes</p>
                        <button type="button" className="w-[100px] rounded-md border border-white/20 p-3 text-white duration-300 hover:bg-gray-500/10">
                            Restore
                        </button>
                    </div>
                    <div className="flex flex-direction-row items-center justify-between text-sm font-medium text-white">
                        <p className="text-ellipsis">How does chromatin structure regulate gene expression in eukaryotes ...</p>
                        <button type="button" className="w-[100px] rounded-md border border-white/20 p-3 text-white duration-300 hover:bg-gray-500/10">
                            Restore
                        </button>
                    </div>
                </form>

                <form  // 'Additional Settings' section
                    id={FORM_SECTIONS.ADDITIONAL_SETTINGS_FORM.id} 
                    className={`p-2 rounded-lg mb-10 w-[650px] flex flex-col duration-300 space-y-2 ${flashClass.get(FORM_SECTIONS.ADDITIONAL_SETTINGS_FORM.id)}`}
                >
                    <button type="button" className="w-[190px] rounded-md border border-white/20 p-3 text-red-500 duration-300 hover:bg-red-900 hover:text-white" onClick={handleDeleteAccount}>  {/* TODO: write function to delete user account */}
                            Delete Account
                        </button>
                </form>
            </div>
        </div>
    );
}

export default Settings;
