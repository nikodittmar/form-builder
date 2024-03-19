import Component from '@/app/component'
import styles from './preview.module.css'
import { ComponentPreview } from './component-preview'

export default function Preview(props: { 
    components: Component[], 
    selectedId: string | null, 
    setSelectedId: (id: string | null) => void,
    displayTitle: string,
    description: string
}) {

    const selectComponent = (event: React.MouseEvent<HTMLDivElement>, component: Component) => {
        event.stopPropagation()
        if (props.selectedId === component.id) {
            props.setSelectedId(null)
        } else {
            props.setSelectedId(component.id)
        }
    }

    return (
        <div onClick={() => props.setSelectedId(null)} className={styles.preview_container}>
            <div className={styles.preview}>
                <div className={styles.title_description_container}>
                {
                    (props.displayTitle.trim() === '') ?
                    (
                        <h2 className={`${styles.title} ${styles.faded}`}>Display Title</h2>
                    ) : (
                        <h2 className={styles.title}>{props.displayTitle}</h2>
                    )
                }
                {
                    (props.description.trim() !== '') && (
                        <p className={styles.description}>{props.description}</p>
                    )
                }
                </div>
                { props.components.length === 0 &&
                (<div className={styles.drop_zone}>
                    <p className={styles.drop_zone_text}>Add a component to begin.</p>
                </div>)
                }
                {
                    props.components.map( component => (
                        <div onClick={(event: React.MouseEvent<HTMLDivElement>) => selectComponent(event, component)}>
                            <ComponentPreview component={component} selected={component.id === props.selectedId} isDragging={false}/>
                        </div>
                    ))
                }
                <div className={styles.submit_container}>
                    <div className="btn btn-primary">Submit</div>
                </div>
            </div>
        </div>
    )
}