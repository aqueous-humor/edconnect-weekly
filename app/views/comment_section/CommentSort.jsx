import React, { useState, useEffect } from 'react';
import {
    Button,
    Dropdown,

} from 'react-bootstrap';
import {
    FaSortAmountUpAlt,
    FaSortAmountDown,
} from 'react-icons/fa';

const CommentSort = ({ ascending, setAscending, comments }) => {
    const [selectedItem, setSelectedItem] = useState();

    /** 
     * Sorts all comments 
     * @param {string} selectedItem
     * @param {boolean} ascendingOrder
    */
    const sortComments = (selectedItem, ascendingOrder) => {
        //Check selectedItem to know if comments are to be sorted by date or by likes
        //sort in ascending or descending order based on if ascendingOrder is true or not 
        if (selectedItem === 'Date') {
            if (ascendingOrder == true) {
                comments.sort(function (a, b) {
                    //createdAt comes in as a string so it must be converted to a Date object for us to work with it
                    return new Date(a.createdAt) - new Date(b.createdAt);
                })
            } else {
                comments.sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                })
            }
        } else if (selectedItem === 'Likes') {
            if (ascendingOrder == true) {
                comments.sort(function (a, b) {
                    return a.likes.length - b.likes.length
                })
            } else {
                comments.sort(function (a, b) {
                    return b.likes.length - a.likes.length
                })
            }
        }
    }

    const onDropdownSel = (event) => {
        event.preventDefault();
        setSelectedItem(event.target.innerText);
        setAscending(undefined);
    }

    const onSortSel = (event) => {
        event.preventDefault();
        if (ascending == false) {
            setAscending(true);
        } else {
            setAscending(false);
        }

    }

    useEffect(() => {
        const ascendingOrder = ascending;
        sortComments(selectedItem, ascendingOrder);
    }, [ascending])

    return (
        <h5 className='d-flex'>
            Sort By
            <Dropdown className='ml-2 mr-2'>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" size='sm'>
                    {selectedItem}
                    <Dropdown.Menu>
                        <Dropdown.Item as='button' onClick={onDropdownSel} >Date</Dropdown.Item>
                        <Dropdown.Item as='button' onClick={onDropdownSel} >Likes</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Toggle>
            </Dropdown>
            <Button variant='dark' size='sm' onClick={onSortSel} >
                {(ascending == false) ? (
                    <FaSortAmountUpAlt />

                ) : (
                    <FaSortAmountDown />
                )
                }
            </Button>
        </h5>
    )
}

export default CommentSort;