import {useState} from "react";
import s from './Pagination.module.css'

type PaginationProps = {
    totalItemsCount: number
    pageSize: number,
    currentPage: number
    portionsSize?: number
    onPageChanged: (value: number) => void
}

export const Paginator = ({totalItemsCount, pageSize, onPageChanged, portionsSize = 8}: PaginationProps) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize)

    const pages = [];
    if (pagesCount > 1) {
        for (let i = 0; i <= pagesCount; i++) {
            pages.push(i + 1)
        }
    }

    const portionCount = Math.ceil(totalItemsCount / portionsSize)
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPageNumber = (portionNumber - 1) * portionsSize + 1
    const rightPageNumber = portionNumber * portionsSize

    return (
        <>
            {portionNumber >= 1 && <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }} className={s.button}>Prev</button>}
            <ul className={s.buttonsContainer}>
                {pages.filter(p => p >= leftPageNumber && p <= rightPageNumber).map(p => {
                    return <li key={p}>
                        <button

                            onClick={() => {
                                onPageChanged(p)
                            }}
                            className={s.button}
                        >
                            {p}
                        </button>
                    </li>
                })}
            </ul>
            {portionCount > portionNumber && <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }} className={s.button}>Next</button>}
        </>
    )

}