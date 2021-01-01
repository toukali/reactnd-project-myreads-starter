import React from 'react';
import Book from './BookComponent';

class BookShelf extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    };
    updateBook = (bookId, shelf) => {
        this.props.updateBook(bookId, shelf);
    }
    render (){
        const books = this.props.bookslist.map((book) => {
            return (
                <li key={book.id}>
                    <Book
                        id={book.id}
                        backgroundImage={book.imageLinks.thumbnail}
                        currentShelf={book.shelf}
                        title={book.title}
                        auther={book.authors}
                        updateBook={this.updateBook}
                    />
                </li>
            );
        });
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books}
                    </ol>
                </div>
          </div>
        );
    };
};

export default BookShelf;