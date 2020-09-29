import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi'


export const UploadProgress = () => {
    const fileInput = useRef(null)

    const [detailsOpen, setDetailsOpen] = useState(false)
    const [files, setFiles] = useState([])

    const speed = 1024 * 1024

    useEffect(() => {
        let arrayList = []
        
        if(files.length>0){
            var temp = files[0].itemSec
            console.log("temp  : " + temp)
        }

        if (files.length > 0 && temp > 0) {
            
            var timer = setTimeout(() => {
                files.map((file) =>  {
                    if (file.itemComp < 100) {
                        let tick = Math.floor(100 / file.itemSec)
                        file.itemComp += tick
                        if (file.itemComp > 100) file.itemComp = 100
                    }
                    if (file.itemSec > 0) {
                        file.itemSec -= 1
                    }
                    arrayList.push(file)
                })
                setFiles(arrayList)
            }, 1000)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [files])


    const totalFileSize = () => {
        let total = 0
        files.map((item) => {
            return total += parseInt(item.size)
        })
        return total
    }

    const totalLeft = () => {
        let seconds = []
        files.map(file => seconds.push(file.itemSec))
        return Math.max(...seconds)
    }

    const calculateTotalPercentage = () => {
        let totalDownloaded = 0
        if (files.length === 0) {
            return 0
        }

        files.map((file) => {
            return totalDownloaded += (parseInt(file.size) * file.itemComp) / 100
        })
        return ((totalDownloaded / totalFileSize()) * 100).toFixed(0)
    }



    detailsOpen
        ? document.documentElement.style.setProperty('--width', 0 + "%")
        : document.documentElement.style.setProperty('--width', calculateTotalPercentage() + "%")

    const createListItems = () => {
        return (
            files.map((item, i) => {
                return (
                    <div className={styles.listItem} key={i}>
                        <div className={styles.listItem__wrapper}>
                            <div className={styles.listItem__left}>
                                <div className={styles.listItem__left__top}>
                                    {item.name}
                                </div>
                                <div className={styles.listItem__left__bottom}>
                                    <span className={styles.upload__bar_item} style={{ width: item.itemComp + "%" }}></span>
                                </div>
                            </div>
                            <div className={styles.listItem__right}>
                                {item.itemComp}% • {item.itemSec > 0 ? item.itemSec + 's left' : "Done!"}
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

    function handleClick() {
        fileInput.current.click()
    }

    function handleFileSelected(e) {
        const selectedFiles = Array.from(e.target.files)
        selectedFiles.map((file) => {
            return (
                file.itemSec = Math.floor(file.size / speed),
                file.itemComp = 0
            )
        })

        setFiles(selectedFiles)

    }


    return (
        <div className={styles.whole}>
            <button className={styles.choose__button} onClick={handleClick}>Choose files</button>
            <input ref={fileInput} id="file-input" className={styles.file__input} type="file" multiple onChange={handleFileSelected} />
            <div className={styles.uploadProgress}>
                <div className={styles.mainBox}>

                    <div className={styles.mainBox__top}>
                        <div className={styles.mainBox__left}>

                            <div className={styles.mainBox__title}>
                                {files.length > 0 ? "Uploading " + files.length + " files" : "Choose files to Upload"}
                            </div>
                            <div className={styles.mainBox__info}>
                                {(files.length > 0) ? <div className={styles.mainBox__percentage}>{calculateTotalPercentage()}%</div> : null}
                                {(files.length > 0) ? <div className={styles.mainBox__seconds}>{totalLeft() > 0 ? totalLeft() + 's left' : 'Done!'}</div> : null}
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

