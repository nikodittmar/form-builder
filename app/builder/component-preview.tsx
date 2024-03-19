import Component, { Checkboxes, ComponentType, EmailAddress, NumberPicker, PhoneNumber, RadioButtons, TextArea, TextField } from "../component"
import styles from "./component-preview.module.css"

export function ComponentPreview(props: { component: Component, selected: boolean, isDragging: boolean }) {
    if (props.component.type === ComponentType.TextField) {
        const component = props.component as TextField
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`} onClick={() => {console.log("clocked")}}>
            <label className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_field}`}>{ component.placeholder }</div>
            <div className="form-text">{ component.helper }</div>
        </div>
        )
    } else if (props.component.type === ComponentType.TextArea) {
        const component = props.component as TextArea
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_area}`}>{ component.placeholder }</div>
            <div className="form-text">{ component.helper }</div>
        </div>
        )
    } else if (props.component.type === ComponentType.EmailAddress) {
        const component = props.component as EmailAddress
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_field}`}>{ component.placeholder }</div>
            <div className="form-text">{ component.helper }</div>
        </div>
        )
    } else if (props.component.type === ComponentType.PhoneNumber) {
        const component = props.component as PhoneNumber
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_field}`}>{ component.placeholder }</div>
            <div className="form-text">{ component.helper }</div>
        </div>
        )

    } else if (props.component.type === ComponentType.NumberPicker) {
        const component = props.component as NumberPicker
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_field}`}>{ component.placeholder }</div>
            <div className="form-text">{ component.helper }</div>
        </div>
        )
    } else if (props.component.type === ComponentType.Checkboxes) {
        const component = props.component as Checkboxes
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</label>
            {
                component.options.map(option => {
                    return (
                        <div className="form-check" key={option.id}>
                            <input className={`form-check-input ${styles.hidden_disabled_text}`} type="checkbox" value="" disabled/>
                            <label className={`form-check-label ${styles.hidden_disabled_text}`}>{option.name}</label>
                        </div>
                    )
                })
            }
            <div className="form-text">{ component.helper }</div>
        </div>
        )
    } else if (props.component.type === ComponentType.RadioButtons) {
        const component = props.component as RadioButtons
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</label>
            {
                component.options.map(option => {
                    return (
                        <div className="form-check" key={option.id}>
                            <input className={`form-check-input ${styles.hidden_disabled_text}`} type="radio" disabled />
                            <label className={`form-check-label ${styles.hidden_disabled_text}`}>{option.name}</label>
                        </div>
                    )
                })
            }
            <div className="form-text">{ component.helper }</div>
        </div>
        )
    }
}