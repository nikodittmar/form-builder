import { DndContext, closestCenter } from '@dnd-kit/core'
import Component, { Choice } from '../../../component'
import styles from './options.module.css'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { FiMinusCircle } from 'react-icons/fi'
import { MdOutlineDragIndicator } from 'react-icons/md'
import { CSS } from "@dnd-kit/utilities"

export default function Options(props: { 
    components: Component[],
    setComponents: (components: Component[]) => void, 
    selectedId: string | null,
    setSelectedId: (id: string | null) => void,
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
            selectedIndex: selectedIndex,
            setSelectedId: props.setSelectedId
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
    selectedIndex: number,
    setSelectedId: (id: string | null) => void,
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
    
    const getChoices = (): Choice[] => {
        if (!hasProperty("choices")) {
            return []
        }

        let component = props.components[props.selectedIndex]
        let choices = component["choices" as keyof typeof component]

        if (Array.isArray(choices) && choices.every(choice => choice instanceof Choice)) {
            return choices
        } else {
            return []
        }
    }

    const handleDragEnd = (event: any) => {
        const {active, over} = event
        const choices = getChoices()
        
        if (active.id !== over.id) {
            const activeIndex = choices.findIndex(choice => choice.id === active.id)
            const overIndex = choices.findIndex(choice => choice.id === over.id)
            updateProperty("choices", arrayMove(choices, activeIndex, overIndex))
        }
    }

    const addChoice = () => {
        const choices = getChoices()
        const newChoice = new Choice()
        updateProperty("choices", [...choices, newChoice])
    }

    const setChoiceName = (id: string, name: string) => {
        const choices = getChoices()
        const choiceIndex = choices.findIndex(choice => choice.id == id)
        if (choiceIndex > -1) {
            choices[choiceIndex].name = name
            updateProperty("choices", choices)
        }
    }

    const deleteChoice = (id: string) => {
        if (canDelete()) {
            const choices = getChoices().filter(choice => choice.id != id)
            updateProperty("choices", choices)
        }
    }

    const canDelete = (): boolean => {
        return getChoices().length > 1
    }

    const deleteComponent = () => {
        const components = [...props.components]
        components.splice(props.selectedIndex, 1)
        props.setComponents(components)
        props.setSelectedId(null)
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
                hasProperty('choices') && (
                    <div className={styles.container}>
                        <div className={styles.label_add_container}>
                            <label className={styles.label}>Choices</label>
                            <p className={`text-primary ${styles.add_option}`} onClick={addChoice}>Add Option</p>
                        </div>
                        <DndContext 
                        collisionDetection={closestCenter} 
                        onDragEnd={handleDragEnd} 
                        modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
                            <SortableContext items={getChoices()} strategy={verticalListSortingStrategy}>
                                {
                                    getChoices().map( choice => {
                                        return (
                                            <ChoicesListItem 
                                                key={choice.id}
                                                choice={choice.name}
                                                id={choice.id}
                                                canDelete={canDelete()}
                                                onDelete={() => deleteChoice(choice.id)}
                                                setChoiceName={(name) => setChoiceName(choice.id, name)}
                                            />
                                        )
                                    })
                                }
                            </SortableContext>
                        </DndContext>
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
            <button onClick={deleteComponent} type="button" className="btn btn-danger btn-sm mt-4">Delete Component</button>
        </div>
    )
}

function ChoicesListItem(props: {
    onDelete: () => void,
    canDelete: boolean,
    setChoiceName: (name: string) => void,
    choice: string,
    id: string
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        isDragging,
        transform,
        transition,
    } = useSortable({id: props.id})
 
    const style = {
        transform: CSS.Translate.toString(transform),
        transition
    }

    return (
     <div className={`${styles.list_item} ${(isDragging) && styles.front}`} ref={setNodeRef} style={style}>
        <div onClick={props.onDelete} className={styles.delete}>
            <FiMinusCircle color={(props.canDelete) ? 'red' : 'var(--secondary-text-color)' }/> 
        </div>
        <input className="form-control form-control-sm" onChange={(event) => props.setChoiceName(event.target.value)} type="text" value={props.choice} />
        <div className={`${styles.drag_handle} ${isDragging ? styles.dragging_cursor : styles.hover_cursor}`}  {...attributes} {...listeners}>
            <MdOutlineDragIndicator color="var(--secondary-text-color)"/>
        </div>
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