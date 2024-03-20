'use client'

import { useState } from 'react'
import BuilderNav from './builder-nav'
import ComponentPicker from './component-picker'
import Options from './options'
import styles from './page.module.css'
import Preview from './preview'
import Component from '@/app/component'

export default function Page() {
    const [components, setComponents] = useState<Component[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [displayTitle, setDisplayTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    return (
    <div className={styles.container}>
        <BuilderNav />
        <div className={styles.builder}>
            <ComponentPicker 
            components={components}
            setComponents={setComponents}
            setSelectedId={setSelectedId}
            />
            <Preview 
            components={components} 
            selectedId={selectedId} 
            setSelectedId={setSelectedId}
            displayTitle={displayTitle}
            description={description}
            />
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