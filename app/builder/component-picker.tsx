"use client"

import { IconContext } from 'react-icons'
import styles from './component-picker.module.css'
import { MdOutlineShortText, MdOutlineEmail, MdOutlinePhone, MdOutlineSubject, MdOutline123, MdOutlineCheckBox, MdOutlineRadioButtonChecked } from 'react-icons/md'


export default function ComponentPicker() {
    return (
        <IconContext.Provider value={{ size: '24px' }}>
        <div className={styles.sidebar}>
            <h3 className={styles.title}>Form Components</h3>

            <div className={styles.component}>
                <div className={styles.icon}>
                    <MdOutlineShortText />
                </div>
                <p className={styles.name}>Text Field</p>  
            </div>

            <div className={styles.component}>
                <div className={styles.icon}>
                    <MdOutlineEmail />
                </div>
                <p className={styles.name}>Email Address</p>  
            </div>

            <div className={styles.component}>
                <div className={styles.icon}>
                    <MdOutlinePhone />
                </div>
                <p className={styles.name}>Phone Number</p>  
            </div>

            <div className={styles.component}>
                <div className={styles.icon}>
                    <MdOutlineSubject />
                </div>
                <p className={styles.name}>Text Area</p>  
            </div>

            <div className={styles.component}>
                <div className={styles.icon}>
                    <MdOutline123 />
                </div>
                <p className={styles.name}>Number Picker</p>  
            </div>

            <div className={styles.component}>
                <div className={styles.icon}>
                    <MdOutlineCheckBox />
                </div>
                <p className={styles.name}>Checkboxes</p>  
            </div>

            <div className={styles.component}>
                <div className={styles.icon}>
                    <MdOutlineRadioButtonChecked />
                </div>
                <p className={styles.name}>Radio Buttons</p>  
            </div>
        </div>
        </IconContext.Provider>
    )
}
