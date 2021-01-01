import React from 'react';
import { Link } from 'react-router-dom';
import Book from './BookComponent';
import * as BooksAPI from './BooksAPI';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            query : "",
            books : null,
        }
    }
    updateBook = (bookId, shelf) =>{
        BooksAPI.update({id: bookId},shelf).then(() => {
            this.setState((prevState)=>{
            return (
                {
                books : prevState.books.map(book => {
                    if (book.id === bookId ) {
                        book.shelf = shelf;
                        this.props.updateBookList(book);
                    };
                    return book;
                }),
                }
            );
            });
        });
    };

    updateQuery = (event) => {
        this.setState({ query : event.target.value }, () => {
            if (this.state.query !== ""){
                BooksAPI.search(this.state.query).then((data) => {
                    /*  because BooksAPI.search return data object with error properity when there is no data to show 
                        I use !data.error so that I know if there is data or no.
                    */
                    if (!data.error){
                        this.setState(() => {
                            return { books : Object.values(data) }
                        })
                    }else{
                        this.setState(() => {
                            return { books: null}
                        })
                    }
                })
            }else{
                this.setState(() => {
                    return { books: null}
                })
            }
        })
    };

    isExisted = (book) => {
        return this.props.bookslist.filter((bookItem) => bookItem.id === book.id);
    }
    
    render(){
        let res; 
        if (this.state.books !== null){
            res = this.state.books.map((book) => {
                const filterBook = this.isExisted(book);
                const shelf = filterBook.length ? filterBook[0].shelf : 'none';
                return(
                    <li key={book.id}>
                        <Book
                            id={book.id}
                            backgroundImage={book.imageLinks ? book.imageLinks.thumbnail : 'none'}
                            currentShelf={shelf}
                            title={book.title}
                            auther={book.authors}
                            updateBook={this.updateBook}
                        />
                    </li>
                );
            });
        }else{
            res = <li></li>;
        }
            
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/home'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query}
                            onChange={(event) => { this.updateQuery(event); }}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {res}
                    </ol>
                </div>
            </div>
        )
    }
};
export default Search;