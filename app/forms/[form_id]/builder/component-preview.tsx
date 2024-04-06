import Component, { Checkboxes, ComponentType, EmailAddress, NumberPicker, PhoneNumber, RadioButtons, TextArea, TextField } from "../../../component"
import styles from "./component-preview.module.css"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function ComponentPreview(props: { component: Component, selected: boolean, onClick: () => void }) {

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        props.onClick()
    }

    const {
        attributes,
        listeners,
        setNodeRef,
        isDragging,
        transform,
        transition,
    } = useSortable({id: props.component.id})
 
    const style = {
        transform: CSS.Translate.toString(transform),
        transition
    }

    let preview: React.ReactNode

    if (props.component.type === ComponentType.TextField) {
        const component = props.component as TextField
        preview = (
        <div>
            <p className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</p>
            <div className={`form-control ${styles.text_field}`}>{ component.placeholder }</div>
            <div className="form-text">{ component.helper }</div>
        </div>
        )
    } else if (props.component.type === ComponentType.TextArea) {
        const component = props.component as TextArea
        preview = (
        <div>
            <p className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</p>
            <div className={`form-control ${styles.text_area}`}>{ component.placeholder }</div>
            <div className="form-text">{ component.helper }</div>
        </div>
        )
    } else if (props.component.type === ComponentType.EmailAddress) {
        const component = props.component as EmailAddress
        preview = (
        <div>
            <p className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</p>
            <div className={`form-control ${styles.text_field}`}>{ component.placeholder }</div>
            <div className="form-text">{ component.helper }</div>
        </div>
        )
    } else if (props.component.type === ComponentType.PhoneNumber) {
        const component = props.component as PhoneNumber
        preview = (
        <div>
            <p className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</p>
            <div className={`form-control ${styles.text_field}`}>{ component.placeholder }</div>
            <div className="form-text">{ component.helper }</div>
        </div>
        )

    } else if (props.component.type === ComponentType.NumberPicker) {
        const component = props.component as NumberPicker
        preview = (
        <div>
            <p className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</p>
            <div className={`form-control ${styles.text_field}`}>{ component.placeholder }</div>
            <div className="form-text">{ component.helper }</div>
        </div>
        )
    } else if (props.component.type === ComponentType.Checkboxes) {
        const component = props.component as Checkboxes
        preview = (
        <div>
            <p className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</p>
            {
                component.choices.map(choice => {
                    return (
                        <div className="form-check" key={choice.id}>
                            <input className={`form-check-input ${styles.hidden_disabled_text}`} type="checkbox" value="" disabled/>
                            <label className={`form-check-label ${styles.hidden_disabled_text}`}>{choice.name}</label>
                        </div>
                    )
                })
            }
            <div className="form-text">{ component.helper }</div>
        </div>
        )
    } else if (props.component.type === ComponentType.RadioButtons) {
        const component = props.component as RadioButtons
        preview = (
        <div>
            <p className="form-label">{ component.name }{ component.required && <span className={styles.required}>*</span>}</p>
            {
                component.choices.map(choice => {
                    return (
                        <div className="form-check" key={choice.id}>
                            <input className={`form-check-input ${styles.hidden_disabled_text}`} type="radio" disabled />
                            <label className={`form-check-label ${styles.hidden_disabled_text}`}>{choice.name}</label>
                        </div>
                    )
                })
            }
            <div className="form-text">{ component.helper }</div>
        </div>
        )
    }

    return (
        <div 
        onClick={(event) => onClick(event)} 
        className={`${styles.component} ${props.selected && styles.selected} ${isDragging && styles.front}`}
        ref={setNodeRef} 
        style={style} 
        {...attributes} 
        {...listeners}
        >
            {preview}
        </div>
    )
}