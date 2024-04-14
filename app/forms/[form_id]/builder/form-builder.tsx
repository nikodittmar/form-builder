'use client'

import { useEffect, useState } from 'react'
import BuilderNav from './builder-nav'
import ComponentPicker from './component-picker'
import Options from './options'
import styles from './form-builder.module.css'
import Preview from './preview'
import Component from '@/app/component'
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import updateForm from '@/app/actions/update-form'
import { useRouter } from 'next/navigation'

export default function FormBuilder(props: { id: string, components: Component[], title: string, description: string, name: string }) {
    const [components, setComponents] = useState<Component[]>(props.components)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [displayTitle, setDisplayTitle] = useState<string>(props.title)
    const [description, setDescription] = useState<string>(props.description)
    const [name, setName] = useState<string>(props.name)
    const [saveStatus, setSaveStatus] = useState<string>('All changes saved.')
    const [initialized, setInitialized] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if (initialized) {
            setSaveStatus('Saving...')

            const handler = setTimeout(async () => {
                try {
                    await updateForm(props.id, name, displayTitle, description, components)
                    setSaveStatus('All changes saved.')
                } catch {
                    setSaveStatus('Error saving form.')
                }
            }, 2000)
        
            return () => {
            clearTimeout(handler)
            }
        } else {
            setInitialized(true)
        }
    }, [ name, components, displayTitle, description ])

    const handleFinish = async () => {
        try {
            await updateForm(props.id, name, displayTitle, description, components)
        } catch {
            setSaveStatus('Error saving form.')
            return
        }

        router.push(`/forms/${props.id}`)
    }

    const handleDragStart = (event: DragStartEvent) => {
        const {active} = event;
        const activeIndex = components.findIndex(component => component.id === active.id)
        if (activeIndex > -1 && activeIndex < components.length) {
            const activeComponent = components[activeIndex]
            if (selectedId != activeComponent.id) {
                setSelectedId(activeComponent.id)
            }
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        
        if (over != null && active.id != over.id) {
            const activeIndex = components.findIndex(component => component.id === active.id)
            const overIndex = components.findIndex(component => component.id === over.id)
            
            setComponents(arrayMove(components, activeIndex, overIndex))
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    )

    return (
    <div className={styles.container}>
        <BuilderNav 
            name={name}
            setName={setName}
            saveStatus={saveStatus}
            onFinish={handleFinish}
        />
        <div className={styles.builder}>
            <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            sensors={sensors}
            autoScroll
            >
                <ComponentPicker 
                components={components}
                setComponents={setComponents}
                setSelectedId={setSelectedId}
                />
                <SortableContext
                items={components}
                strategy={verticalListSortingStrategy}
                >
                    <Preview 
                    components={components} 
                    selectedId={selectedId} 
                    setSelectedId={setSelectedId}
                    displayTitle={displayTitle}
                    description={description}
                    />
                </SortableContext>
            </DndContext>
            <Options 
            components={components}
            setComponents={setComponents}
            selectedId={selectedId}
            displayTitle={displayTitle}
            setDisplayTitle={setDisplayTitle}
            description={description}
            setDescription={setDescription}
            setSelectedId={setSelectedId}
            />
        </div>
    </div>
    )
}
