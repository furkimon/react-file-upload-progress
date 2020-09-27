import React, { useState, useRef } from 'react'
import styles from './styles.module.css'
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi'


export const UploadProgress = ({ items }) => {
    const [detailsOpen, setDetailsOpen] = useState(false)
    const totalFileSize = () => {
        let total = 0
        items.map((item) => {
            return total += parseInt(item.size)
        })
        return total
    }

    const totalLeft = () => {
        let seconds = []
        items.map((item) => {
            return seconds.push(parseInt(item.secLeft))
        })
        return Math.max(...seconds)
    }

    const calculateTotalPercentage = () => {
        let totalDownloaded = 0
        if (items.length === 0) {
            return 0
        }
        items.map((file) => {
            return totalDownloaded += (parseInt(file.size) * file.completedPercentage) / 100
        })
        return ((totalDownloaded / totalFileSize()) * 100).toFixed(0)
    }

    detailsOpen
        ? document.documentElement.style.setProperty('--width', 0 + "%")
        : document.documentElement.style.setProperty('--width', calculateTotalPercentage() + "%")

    items.map(item => { return document.documentElement.style.setProperty('--width2', item.completedPercentage + "%") })

    const createListItems = () => {
        return (
            items.map((item) => {
                return (
                    <div className={styles.listItem}>
                        <div className={styles.listItem__wrapper}>
                            <div className={styles.listItem__left}>
                                <div className={styles.listItem__left__top}>
                                    {item.fileName}
                                </div>
                                <div className={styles.listItem__left__bottom}>
                                    <span className={styles.upload__bar_item}></span>
                                </div>
                            </div>
                            <div className={styles.listItem__right}>
                                {parseInt(item.completedPercentage)}% • {item.secLeft}s left
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    const showDetails = () => {
        setDetailsOpen(!detailsOpen)
    }
    
    
    // function handleClick(){
    //     fileInput.current.focus();
    // }

    // function handleFileSelected(e){
    //     const files = Array.from(e.target.files)
    // }
    
    // const fileInput = useRef(null)
    
    return (
        <div className={styles.whole}>
            {/* <button onClick={handleClick}>Open</button>
            <input ref={fileInput} id="file-input" type="file" multiple onChange={handleFileSelected}  /> */}
            <div className={styles.uploadProgress}>
                <div className={styles.mainBox}>

                    <div className={styles.mainBox__top}>
                        <div className={styles.mainBox__left}>

                            <div className={styles.mainBox__title}>Uploading {items.length} files</div>
                            <div className={styles.mainBox__info}>
                                <div className={styles.mainBox__percentage}>{calculateTotalPercentage()}%</div>
                                <div className={styles.mainBox__seconds}>{totalLeft()}s left</div>
                            </div>

                        </div>
                        <div className={styles.mainBox__right} onClick={showDetails}>
                            {detailsOpen
                                ? <FiMinimize2 className={styles.minimize} size={'25px'} />
                                : <FiMaximize2 className={styles.maximize} size={'25px'} />}
                        </div>
                    </div>
                    <div className={styles.mainBox__bottom}>
                        <span className={styles.upload__bar}></span>
                    </div>
                </div>
            </div>
            {detailsOpen
                ? <div className={styles.listItems}>{createListItems()}</div>
                : null}
        </div>
    )
}

// export default UploadProgress
