import { v4 as uuidv4} from 'uuid'

export enum ComponentType {
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

    constructor(id: string = uuidv4(), name: string = 'Text Field', required: boolean = false, helper: string = '', placeholder: string = '') {
        super(id, name, required, helper, placeholder)
    }
}

export class TextArea extends TextComponent implements Component {
    type = ComponentType.TextArea

    constructor(id: string = uuidv4(), name: string = 'Text Area', required: boolean = false, helper: string = '', placeholder: string = '') {
        super(id, name, required, helper, placeholder)
    }
}

export class EmailAddress extends TextComponent implements Component {
    type = ComponentType.EmailAddress

    constructor(id: string = uuidv4(), name: string = 'Email Address', required: boolean = false, helper: string = '', placeholder: string = '') {
        super(id, name, required, helper, placeholder)
    }
}

export class PhoneNumber extends TextComponent implements Component {
    type = ComponentType.PhoneNumber

    constructor(id: string = uuidv4(), name: string = 'Phone Number', required: boolean = false, helper: string = '', placeholder: string = '') {
        super(id, name, required, helper, placeholder)
    }
}

export class NumberPicker extends TextComponent implements Component {
    type = ComponentType.NumberPicker
    minValue?: number
    maxValue?: number

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
    
    constructor(id: string = uuidv4(), name: string = 'Checkboxes', required: boolean = false, helper: string = '', options: Option[] = [new Option(uuidv4(), "Option")]) { 
        super(id, name, required, helper, options)
    }
}

export class RadioButtons extends ChoiceComponent implements Component {
    type = ComponentType.RadioButtons
    
    constructor(id: string = uuidv4(), name: string = 'Radio Buttons', required: boolean = false, helper: string = '', options: Option[] = [new Option(uuidv4(), "Option")]) { 
        super(id, name, required, helper, options)
    }
}