import Component from '../component'
import styles from './options.module.css'

export default function Options(props: { 
    components: Component[],
    setComponents: (components: Component[]) => void, 
    selectedId: string | null 
}) {

    let selectedIndex: number | null = null
    
    for (let i = 0; i < props.components.length; i++) {
        if (props.components[i].id === props.selectedId) {
            selectedIndex = i
        }
    }

    if (selectedIndex != null) {
        return ComponentOptions({ 
            components: props.components, 
            setComponents: props.setComponents, 
            selectedIndex: selectedIndex
        })
    } else {
        return FormOptions()
    }
}

function ComponentOptions(props: { 
    components: Component[], 
    setComponents: (components: Component[]) => void, 
    selectedIndex: number
 }) {

    const updateProperty = (property: string, newValue: any) => {
        const components = [...props.components]

        console.log(newValue)

        if (props.selectedIndex < 0 || props.selectedIndex >= components.length) {
            return
        }
        let component = props.components[props.selectedIndex]

        if (!Object.hasOwn(component, property)) {
            return
        }

        if (typeof component[property as keyof typeof component] != typeof newValue) {
            return
        }

        const updatedComponent = { ...component, [property]: newValue }
        components[props.selectedIndex] = updatedComponent
        props.setComponents(components)
    }

    const hasOption = (property: string): boolean => {
        if (props.selectedIndex < 0 || props.selectedIndex >= props.components.length) {
            return false
        }

        return Object.hasOwn(props.components[props.selectedIndex], property)
    }

    const getString = (property: string): string => {
        if (props.selectedIndex < 0 || props.selectedIndex >= props.components.length) {
            return ''
        }
        let component = props.components[props.selectedIndex]

        if (Object.hasOwn(component, property)) {
            return String(component[property as keyof typeof component])
        } else {
            return ''
        }
    }

    const getBoolean = (property: string): boolean => {
        if (props.selectedIndex < 0 || props.selectedIndex >= props.components.length) {
            return false
        }
        let component = props.components[props.selectedIndex]

        if (!Object.hasOwn(component, property)) {
           return false
        } 

        if (component[property as keyof typeof component] === true) {
            return true
        } else {
            return false
        }
    }   
    
    return (
        <div className={styles.sidebar}>
            <h3 className={styles.title}>Component Options</h3>
            {
                hasOption('name') && (
                    <div className={styles.container}>
                        <label className={styles.label}>Label</label>
                        <input 
                        className="form-control form-control-sm" 
                        type="text" 
                        value={getString('name')} 
                        onChange={(event) => { updateProperty('name', event.target.value) }}
                        />
                    </div>
                )
            }
            {
                hasOption('placeholder') && (
                    <div className={styles.container}>
                        <label className={styles.label}>Placeholder</label>
                        <input 
                        className="form-control form-control-sm" 
                        type="text"
                        value={getString('placeholder')} 
                        onChange={(event) => { updateProperty('placeholder', event.target.value) }}
                        />
                    </div>
                )
            }
            {
                hasOption('helper') && (
                    <div className={styles.container}>
                        <label className={styles.label}>Helper</label>
                        <textarea 
                        className="form-control form-control-sm" 
                        rows={3}
                        value={getString('helper')} 
                        onChange={(event) => { updateProperty('helper', event.target.value) }}
                        />
                    </div>
                )
            }
            {
                hasOption('required') && (
                    <div className={styles.container}>
                        <div className={styles.check_option_container}>
                            <input 
                            className={`form-check-input ${styles.check_option}`}
                            type="checkbox" 
                            checked={getBoolean('required')}
                            onChange={() => {updateProperty('required', !getBoolean('required'))}}
                            />
                            <label className={styles.label}>Required</label>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

function FormOptions() {
    return (
        <div className={styles.sidebar}>
            <h3 className={styles.title}>Form Options</h3>
        </div>
    )
}