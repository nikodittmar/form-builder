'use client'
import Component from '@/app/component'
import styles from './builder-nav.module.css'

export default function BuilderNav(props: { onFinish: () => void, saveStatus: string, name: string, setName: (newName: string) => void  }) {

    return (
        <div className={styles.nav}>
            <div className={styles.brand}>

            </div>
            <div className={styles.name}>
                <input className={`form-control ${styles.name_input}`} value={props.name} onChange={(event) => props.setName(event.target.value)} placeholder='Untitled Form'/>
            </div>
            <div className={styles.actions}>
            <p className={styles.saved_status}>{props.saveStatus}</p>
                <button className={`btn btn-primary ${styles.finish_button}`} onClick={props.onFinish}>Finish</button>
            </div>
        </div>
    )
}