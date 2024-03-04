"use client"

import { IconContext } from 'react-icons'
import styles from './component-picker.module.css'
import { MdOutlineShortText, MdOutlineEmail, MdOutlinePhone, MdOutlineSubject, MdOutline123, MdOutlineCheckBox, MdOutlineRadioButtonChecked } from 'react-icons/md'
import Component, { Checkboxes, EmailAddress, NumberPicker, PhoneNumber, RadioButtons, TextArea, TextField } from '@/app/component'

export default function ComponentPicker(props: { 
    components: Component[],
    setComponents: (components: Component[]) => void,
    setSelectedId: (id: string) => void
}) {

    const addComponent = (component: Component) => {
        props.setComponents([...props.components, component])
        props.setSelectedId(component.id)
    }

    return (
        <IconContext.Provider value={{ size: '24px' }}>
        <div className={styles.sidebar}>
            <h3 className={styles.title}>Form Components</h3>

            <div className={styles.component} onClick={() => addComponent(new TextField())}>
                <div className={styles.icon}>
                    <MdOutlineShortText />
                </div>
                <p className={styles.name}>Text Field</p>  
            </div>

            <div className={styles.component} onClick={() => addComponent(new EmailAddress())}>
                <div className={styles.icon}>
                    <MdOutlineEmail />
                </div>
                <p className={styles.name}>Email Address</p>  
            </div>

            <div className={styles.component} onClick={() => addComponent(new PhoneNumber())}>
                <div className={styles.icon}>
                    <MdOutlinePhone />
                </div>
                <p className={styles.name}>Phone Number</p>  
            </div>

            <div className={styles.component} onClick={() => addComponent(new TextArea())}>
                <div className={styles.icon}>
                    <MdOutlineSubject />
                </div>
                <p className={styles.name}>Text Area</p>  
            </div>

            <div className={styles.component} onClick={() => addComponent(new NumberPicker())}>
                <div className={styles.icon}>
                    <MdOutline123 />
                </div>
                <p className={styles.name}>Number Picker</p>  
            </div>

            <div className={styles.component} onClick={() => addComponent(new Checkboxes())}>
                <div className={styles.icon}>
                    <MdOutlineCheckBox />
                </div>
                <p className={styles.name}>Checkboxes</p>  
            </div>

            <div className={styles.component} onClick={() => addComponent(new RadioButtons())}>
                <div className={styles.icon}>
                    <MdOutlineRadioButtonChecked />
                </div>
                <p className={styles.name}>Radio Buttons</p>  
            </div>
        </div>
        </IconContext.Provider>
    )
}
