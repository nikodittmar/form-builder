"use client"

import { IconContext } from 'react-icons'
import styles from './component-picker.module.css'
import { MdOutlineShortText, MdOutlineEmail, MdOutlinePhone, MdOutlineSubject, MdOutline123, MdOutlineCheckBox, MdOutlineRadioButtonChecked } from 'react-icons/md'
import Component, { Checkboxes, EmailAddress, NumberPicker, PhoneNumber, RadioButtons, TextArea, TextField } from '@/app/component'
import { ComponentType } from '../component'

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
            {
                Object.values(ComponentType).map(componentType => {
                    return (
                        <ComponentOption key={componentType} type={componentType} onAdd={addComponent}/>
                    )
                })
            }

        </div>
        </IconContext.Provider>
    )
}

function ComponentOption(props: { type: ComponentType, onAdd: (component: Component) => void }) {

    let option: React.ReactNode

    switch (props.type) {
        case ComponentType.TextField:
            option = (
            <div className={styles.component} onClick={() => props.onAdd(new TextField())}>
                <div className={styles.icon}>
                    <MdOutlineShortText />
                </div>
                <p className={styles.name}>Text Field</p>  
            </div>
            )
            break
        case ComponentType.TextArea:
            option = (
            <div className={styles.component} onClick={() => props.onAdd(new TextArea())}>
                <div className={styles.icon}>
                    <MdOutlineSubject />
                </div>
                <p className={styles.name}>Text Area</p>  
            </div>
            )
            break
        case ComponentType.EmailAddress:
            option = (
            <div className={styles.component} onClick={() => props.onAdd(new EmailAddress())}>
                <div className={styles.icon}>
                    <MdOutlineEmail />
                </div>
                <p className={styles.name}>Email Address</p>  
            </div>
            )
            break
        case ComponentType.PhoneNumber:
            option = (
            <div className={styles.component} onClick={() => props.onAdd(new PhoneNumber())}>
                <div className={styles.icon}>
                    <MdOutlinePhone />
                </div>
                <p className={styles.name}>Phone Number</p>  
            </div>
            )
            break
        case ComponentType.NumberPicker:
            option = (
            <div className={styles.component} onClick={() => props.onAdd(new NumberPicker())}>
                <div className={styles.icon}>
                    <MdOutline123 />
                </div>
                <p className={styles.name}>Number Picker</p>  
            </div>
            )
            break
        case ComponentType.Checkboxes:
            option = (
            <div className={styles.component} onClick={() => props.onAdd(new Checkboxes())}>
                <div className={styles.icon}>
                    <MdOutlineCheckBox />
                </div>
                <p className={styles.name}>Checkboxes</p>  
            </div>
            )
            break
        case ComponentType.RadioButtons:
            option = (
            <div className={styles.component} onClick={() => props.onAdd(new RadioButtons())}>
                <div className={styles.icon}>
                    <MdOutlineRadioButtonChecked />
                </div>
                <p className={styles.name}>Radio Buttons</p>  
            </div>
            )
            break
    }

    return (
        <div>
            {option}
        </div>
    )
}