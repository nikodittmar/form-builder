import Component, { Checkboxes, EmailAddress, NumberPicker, PhoneNumber, RadioButtons, TextArea, TextField } from "../component"
import styles from "./component-preview.module.css"

export function ComponentPreview(props: { component: Component, selected: boolean, isDragging: boolean }) {
    if (props.component instanceof TextField) {
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`} onClick={() => {console.log("clocked")}}>
            <label className="form-label">{ props.component.name }{ props.component.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_field}`}>{ props.component.placeholder }</div>
            <div className="form-text">{ props.component.helper }</div>
        </div>
        )
    } else if (props.component instanceof TextArea) {
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ props.component.name }{ props.component.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_area}`}>{ props.component.placeholder }</div>
            <div className="form-text">{ props.component.helper }</div>
        </div>
        )
    } else if (props.component instanceof EmailAddress) {
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ props.component.name }{ props.component.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_field}`}>{ props.component.placeholder }</div>
            <div className="form-text">{ props.component.helper }</div>
        </div>
        )
    } else if (props.component instanceof PhoneNumber) {
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ props.component.name }{ props.component.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_field}`}>{ props.component.placeholder }</div>
            <div className="form-text">{ props.component.helper }</div>
        </div>
        )

    } else if (props.component instanceof NumberPicker) {
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ props.component.name }{ props.component.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_field}`}>{ props.component.placeholder }</div>
            <div className="form-text">{ props.component.helper }</div>
        </div>
        )
    } else if (props.component instanceof Checkboxes) {
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ props.component.name }{ props.component.required && <span className={styles.required}>*</span>}</label>
            {
                props.component.options.map(option => {
                    return (
                        <div className="form-check" key={option.id}>
                            <input className={`form-check-input ${styles.hidden_disabled_text}`} type="checkbox" value="" disabled/>
                            <label className={`form-check-label ${styles.hidden_disabled_text}`}>{option.name}</label>
                        </div>
                    )
                })
            }
            <div className="form-text">{ props.component.helper }</div>
        </div>
        )
    } else if (props.component instanceof RadioButtons) {
        return (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ props.component.name }{ props.component.required && <span className={styles.required}>*</span>}</label>
            {
                props.component.options.map(option => {
                    return (
                        <div className="form-check" key={option.id}>
                            <input className={`form-check-input ${styles.hidden_disabled_text}`} type="radio" disabled />
                            <label className={`form-check-label ${styles.hidden_disabled_text}`}>{option.name}</label>
                        </div>
                    )
                })
            }
            <div className="form-text">{ props.component.helper }</div>
        </div>
        )
    }
}