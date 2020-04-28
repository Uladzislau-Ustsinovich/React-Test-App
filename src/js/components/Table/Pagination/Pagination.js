import React from "react";


export const Pagination = (props) => {
    console.log(props)
    return (
        <div className="pagination">
            <button onClick={() => props.previousPage()} disabled={!props.canPreviousPage}>
                {'<'}
            </button>

            <span>
                    <strong>
                        {props.pageIndex + 1} of {props.pageOptions.length}
                    </strong>{' '}
                </span>

            <button onClick={() => props.nextPage()} disabled={props.canNextPage}>
                {'>'}
            </button>

        </div>
    )
}

{/*<Pagination*/}
{/*    previousPage={previousPage}*/}
{/*    canPreviousPage={canPreviousPage}*/}
{/*    pageIndex={pageIndex}*/}
{/*    pageOptions={pageOptions}*/}
{/*    nextPage={nextPage}*/}
{/*    canNextPage={canNextPage}*/}
{/*/>*/}