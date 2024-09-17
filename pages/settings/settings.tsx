import React, { useState } from "react";


const NavbarButton = ({  // button in the navbar, used to navigate through the different sections of the Settings page
    clickHandler,
    formSection,
}: {
    clickHandler: (arg: string) => void,
    formSection: FormSectionType,
}) => (
    <button type="button" className="rounded-md p-3 text-white duration-300 hover:bg-gray-500/10" onClick={() =>     clickHandler(formSection.id)}>
        {formSection.label}
    </button>

)

const TextBoxFormRow = ({  // text box with label above it
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

const Button = ({  // button that allows customization for onClick event, buttonType, and display text
    buttonType,
    placeholder,
    clickHandler,
}: {
    buttonType: 'button' | 'submit' | 'reset' | undefined,
    placeholder: string,
    clickHandler: () => void,
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

interface DropdownOption {  // helper for "DropdownBox": accepts a variable number of strings to be listed in the dropdown box
    value: string,
    label: string,
};

const DropdownBox = ({ // dropdown button that shows a list of strings when clicked
    formId,
    labelText,
    dropdownOptions,
}: {
    formId: string,
    labelText: string,
    dropdownOptions: DropdownOption[],
}) => (
    <div className="flex flex-direction-col justify-between">
        <label htmlFor={formId} className="block text-sm font-medium text-white w-[200px] mr-[25px] flex items-center">
            {labelText}
        </label>
        <select name={`${formId}-${labelText}`} className="text-sm font-medium text-white w-[150px] bg-[#343541] p-2 border border-white/20 rounded-lg duration-300 hover:bg-gray-500/10 outline-none cursor-grab">
            {   dropdownOptions.map((dropdownOption, index) => 
                    <option key={index} value={dropdownOption.value}>{dropdownOption.label}</option>
                )
            }
        </select>
    </div>
)

const scrollToElement = function (elementId: any) {  // scroll to the target element in the page
    const element = document.getElementById(elementId)
    element?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest",});
}

interface FormSectionType { // helper for "FORM_SECTIONS": an ID structure used to identify/name a Settings page section
    id: string,
    label: string,
}

const FORM_SECTIONS = {  // map of the different forms/sections of the Settings page
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
    const getNewMap = (target: string) =>  // creates a map associating each nav bar button to a form
        new Map<string, string>(
            Object.values(FORM_SECTIONS).map(section => [section.id, section.id === target ? 'bg-gray-500/10' : '']));
    const [flashClass, setFlashClass] = useState<Map<string, string>>(getNewMap(''));
    const FormGlow = (formSectionId: string) => {  // when a nav button is clicked, the associated form lights up for a sec
        setFlashClass(getNewMap(formSectionId));
        setTimeout(() => setFlashClass(getNewMap('')), 1000);
    }
    const updateAccountSettings = () => {  // update changes made to the Account form
        console.log('TODO: update account settings');
    };
    const updateAccessibilitySettings = () => {  // update changes made to the Accessibility form
        console.log('TODO: update accessibility settings');
    };
    const handleDeleteAccount = () => {  // deletes any data associated with the user on the website
        console.log('TODO: delete account');
    };
    const handleNavButtonClick = (formSectionId: string) => {  // perform these two functions when a nav bar button is clicked
        FormGlow(formSectionId);
        scrollToElement(formSectionId);
    }

    return (
        <div id="body" className="bg-[#343541] size-full flex flex-col justify-center">
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
                    <Toggle formId="inverted-colors" placeholder="Dark Mode" />
                    <Toggle formId="inverted-colors" placeholder="Large Mouse Cursor" />
                    <DropdownBox 
                        formId={FORM_SECTIONS.ACCESSIBLITY_FORM.id} 
                        labelText="Display size" 
                        dropdownOptions={
                            [
                                {label: 'Small', value: 'small'},
                                {label: 'Medium', value: 'medium'},
                                {label: 'Large', value: 'large'},
                            ]
                        }
                    />

                    <DropdownBox 
                        formId={FORM_SECTIONS.ACCESSIBLITY_FORM.id} 
                        labelText="Select language"
                        dropdownOptions={
                            [
                                {label: 'English', value: 'english'},
                                {label: 'Spanish', value: 'spanish'},
                                {label: 'French', value: 'french'},
                                {label: 'Arabic', value: 'arabic'},
                            ]
                        }
                    />

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
                    <button type="button" className="w-[190px] rounded-md border border-white/20 p-3 text-red-500 duration-300 hover:bg-[#B01307] hover:text-white" onClick={handleDeleteAccount}>  {/* TODO: write function to delete user account */}
                            Delete Account
                        </button>
                </form>
            </div>
        </div>
    );
};
export default Settings;
