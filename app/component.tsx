import { v4 as uuidv4} from 'uuid'
import styles from './component.module.css'

enum ComponentType {
    TextField = "text-field",
    TextArea = "text-area",
    EmailAddress = "email-address",
    PhoneNumber = "phone-number",
    NumberPicker = "number-picker",
    Checkboxes = "checkboxes",
    RadioButtons = "radio-buttons"
}

export default interface Component {
    id: string
    name: string
    required: boolean
    type: ComponentType
    preview: (props: { selected: boolean, isDragging: boolean}) => JSX.Element
}

class TextComponent {
    id: string
    name: string
    required: boolean
    helper: string
    placeholder: string

    constructor(id: string, name: string, required: boolean, helper: string, placeholder: string) {
        this.id = id
        this.name = name
        this.required = required
        this.helper = helper
        this.placeholder = placeholder
    }
}

export class TextField extends TextComponent implements Component {
    type = ComponentType.TextField
    preview = (props: { selected: boolean, isDragging: boolean}) => (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`} onClick={() => {console.log("clocked")}}>
            <label className="form-label">{ this.name }{ this.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_field}`}>{ this.placeholder }</div>
            <div className="form-text">{ this.helper }</div>
        </div>
    )

    constructor(id: string = uuidv4(), name: string = 'Text Field', required: boolean = false, helper: string = '', placeholder: string = '') {
        super(id, name, required, helper, placeholder)
    }
}

export class TextArea extends TextComponent implements Component {
    type = ComponentType.TextArea
    preview = (props: { selected: boolean, isDragging: boolean}) => (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ this.name }{ this.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_area}`}>{ this.placeholder }</div>
            <div className="form-text">{ this.helper }</div>
        </div>
    )

    constructor(id: string = uuidv4(), name: string = 'Text Area', required: boolean = false, helper: string = '', placeholder: string = '') {
        super(id, name, required, helper, placeholder)
    }
}

export class EmailAddress extends TextComponent implements Component {
    type = ComponentType.EmailAddress
    preview = (props: { selected: boolean, isDragging: boolean}) => (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ this.name }{ this.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_field}`}>{ this.placeholder }</div>
            <div className="form-text">{ this.helper }</div>
        </div>
    )

    constructor(id: string = uuidv4(), name: string = 'Email Address', required: boolean = false, helper: string = '', placeholder: string = '') {
        super(id, name, required, helper, placeholder)
    }
}

export class PhoneNumber extends TextComponent implements Component {
    type = ComponentType.PhoneNumber
    preview = (props: { selected: boolean, isDragging: boolean}) => (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ this.name }{ this.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_field}`}>{ this.placeholder }</div>
            <div className="form-text">{ this.helper }</div>
        </div>
    )

    constructor(id: string = uuidv4(), name: string = 'Phone Number', required: boolean = false, helper: string = '', placeholder: string = '') {
        super(id, name, required, helper, placeholder)
    }
}

export class NumberPicker extends TextComponent implements Component {
    type = ComponentType.NumberPicker
    minValue?: number
    maxValue?: number
    preview = (props: { selected: boolean, isDragging: boolean}) => (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ this.name }{ this.required && <span className={styles.required}>*</span>}</label>
            <div className={`form-control ${styles.text_field}`}>{ this.placeholder }</div>
            <div className="form-text">{ this.helper }</div>
        </div>
    )

    constructor(id: string = uuidv4(), name: string = 'Number Picker', required: boolean = false, helper: string = '', placeholder: string = '', minValue?: number, maxValue?: number) {
        super(id, name, required, helper, placeholder)
        this.minValue = minValue
        this.maxValue = maxValue
    }
}

export class Option {
    id: string
    name: string

    constructor(id: string = uuidv4(), name: string = '') {
        this.id = id
        this.name = name
    }
}

class ChoiceComponent {
    id: string
    name: string
    required: boolean
    helper: string
    options: Option[]

    constructor(id: string, name: string, required: boolean, helper: string, options: Option[]) {
        this.id = id
        this.name = name
        this.required = required
        this.helper = helper
        this.options = options
    }
}

export class Checkboxes extends ChoiceComponent implements Component {
    type = ComponentType.Checkboxes
    preview = (props: { selected: boolean, isDragging: boolean}) => (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ this.name }{ this.required && <span className={styles.required}>*</span>}</label>
            {
                this.options.map(option => {
                    return (
                        <div className="form-check" key={option.id}>
                            <input className={`form-check-input ${styles.hidden_disabled_text}`} type="checkbox" value="" disabled/>
                            <label className={`form-check-label ${styles.hidden_disabled_text}`}>{option.name}</label>
                        </div>
                    )
                })
            }
            <div className="form-text">{ this.helper }</div>
        </div>
    )

    constructor(id: string = uuidv4(), name: string = 'Checkboxes', required: boolean = false, helper: string = '', options: Option[] = [new Option(uuidv4(), "Option")]) { 
        super(id, name, required, helper, options)
    }
}

export class RadioButtons extends ChoiceComponent implements Component {
    type = ComponentType.RadioButtons
    preview = (props: { selected: boolean, isDragging: boolean}) => (
        <div className={`${styles.component} ${props.selected && styles.selected} ${props.isDragging && styles.front}`}>
            <label className="form-label">{ this.name }{ this.required && <span className={styles.required}>*</span>}</label>
            {
                this.options.map(option => {
                    return (
                        <div className="form-check" key={option.id}>
                            <input className={`form-check-input ${styles.hidden_disabled_text}`} type="radio" disabled />
                            <label className={`form-check-label ${styles.hidden_disabled_text}`}>{option.name}</label>
                        </div>
                    )
                })
            }
            <div className="form-text">{ this.helper }</div>
        </div>
    )

    constructor(id: string = uuidv4(), name: string = 'Radio Buttons', required: boolean = false, helper: string = '', options: Option[] = [new Option(uuidv4(), "Option")]) { 
        super(id, name, required, helper, options)
    }
}