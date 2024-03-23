'use client'

import { useState } from 'react'
import BuilderNav from './builder-nav'
import ComponentPicker from './component-picker'
import Options from './options'
import styles from './page.module.css'
import Preview from './preview'
import Component from '@/app/component'
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers'

export default function Page() {
    const [components, setComponents] = useState<Component[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [displayTitle, setDisplayTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

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
        <BuilderNav components={components} />
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