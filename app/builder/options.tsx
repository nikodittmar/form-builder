import Component from '../component'
import styles from './options.module.css'

export default function Options(props: { 
    components: Component[],
    setComponents: (components: Component[]) => void, 
    selectedId: string | null,
    displayTitle: string,
    setDisplayTitle: (displayTitle: string) => void
    description: string,
    setDescription: (description: string) => void
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
        return FormOptions({
            displayTitle: props.displayTitle,
            setDisplayTitle: props.setDisplayTitle,
            description: props.description,
            setDescription: props.setDescription,
        })
    }
}

function ComponentOptions(props: { 
    components: Component[], 
    setComponents: (components: Component[]) => void, 
    selectedIndex: number
 }) {

    const updateProperty = (property: string, newValue: any) => {
        if (!hasProperty(property)) {
            return
        }

        const components = [...props.components]
        let component = props.components[props.selectedIndex]
       
        if (typeof component[property as keyof typeof component] != typeof newValue) {
            return
        }

        const updatedComponent = { ...component, [property]: newValue }
        components[props.selectedIndex] = updatedComponent
        props.setComponents(components)
    }

    const hasProperty = (property: string): boolean => {
        if (props.selectedIndex < 0 || props.selectedIndex >= props.components.length) {
            return false
        }

        return Object.hasOwn(props.components[props.selectedIndex], property)
    }

    const getString = (property: string): string => {
        if (!hasProperty(property)) {
            return ''
        }

        let component = props.components[props.selectedIndex]
        return String(component[property as keyof typeof component])
    }

    const getBoolean = (property: string): boolean => {
        if (!hasProperty(property)) {
            return false
        }

        let component = props.components[props.selectedIndex]
        return component[property as keyof typeof component] === true
    }   
    
    return (
        <div className={styles.sidebar}>
            <h3 className={styles.title}>Component Options</h3>
            {
                hasProperty('name') && (
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
                hasProperty('placeholder') && (
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
                hasProperty('helper') && (
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
                hasProperty('required') && (
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

function FormOptions(props: {
    displayTitle: string, 
    setDisplayTitle: (displayTitle: string) => void 
    description: string,
    setDescription: (description: string) => void 
}) {
    return (
        <div className={styles.sidebar}>
            <h3 className={styles.title}>Form Options</h3>
            <div className={styles.container}>
                <label className={styles.label}>Display Title</label>
                <input 
                className="form-control form-control-sm" 
                type="text" 
                value={props.displayTitle} 
                onChange={(event) => { props.setDisplayTitle(event.target.value) }}
                />
            </div>
            <div className={styles.container}>
                <label className={styles.label}>Description</label>
                <textarea 
                className="form-control form-control-sm" 
                rows={3}
                value={props.description} 
                onChange={(event) => { props.setDescription(event.target.value ) }}
                />
            </div>
        </div>
    )
}