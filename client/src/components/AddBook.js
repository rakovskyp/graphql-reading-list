import React from 'react'
// binds apollo to react
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

const AddBook = (props) => {

    const [bookName, setBookName] = React.useState('')
    const [bookGenre, setBookGenre] = React.useState('')
    const [bookAuthor, setBookAuthor] = React.useState('')

    function displayAuthors() {
        var data = props.getAuthorsQuery;
        if (data.loading) {
            return (<option disabled>Loading Authors...</option>)
        } else {
            return (
                data.authors.map(
                    (author) => <option key={author.id} value={author.id}>{author.name}</option>
                )
            )
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        props.addBookMutation({
            variables: {
                name: bookName,
                genre: bookGenre,
                authorId: bookAuthor
            }, refetchQueries: [{
                query: getBooksQuery
            }]
        })
    }

    return (
    <form id="add-book" onSubmit={handleSubmit}>

        <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={ (event) => setBookName(event.target.value)}/>
        </div>

        <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={ (event) => setBookGenre(event.target.value)}/>
        </div>

        <div className="field">
            <label>Author:</label>
            <select onChange={(event) => setBookAuthor(event.target.value)}>
                <option>Select author</option>
                {displayAuthors()}
            </select>
        </div>

        <button>+</button>

    </form>
    )
}

// integrate getBooksQuery to BookList by storing it in BookList's props
export default compose (
    graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
    graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook);