import React from 'react'
// binds apollo to react
import { graphql } from 'react-apollo'

import { getBooksQuery } from '../queries/queries'

import BookDetails from './BookDetails'

const BookList = (props) => {
    const [selected, setSelected] = React.useState(null);

    function displayBooks() {
        var { data } = props;
        if (data.loading) {
            return (<div>Loading books...</div>)
        } else {
            return (data.books.map(
                (book) => {
                    return (
                        <li key={book.id}
                        onClick={(e) => {setSelected(book.id)}}
                        >{book.name}</li>
                    )
                }
            ))
        }
    }

    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookid={selected}/>
        </div>
    )
}

// integrate getBooksQuery to BookList by storing it in BookList's props
export default graphql(getBooksQuery)(BookList);