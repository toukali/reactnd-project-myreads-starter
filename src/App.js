import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import BookShelf from './BookShelfComponent';
import Search from './SearchComponent';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount(){
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }));
    });
  };
  
  updateBook = (bookId, shelf) =>{
    BooksAPI.update({id: bookId},shelf).then(() => {
      this.setState((prevState)=>{
        return (
          {
            books : prevState.books.map(book => {
              if (book.id === bookId ) {book.shelf = shelf};
              return book;
          }),
          }
        );
      });
    });
  };

  updateBookList = (book) => {
    this.setState((prevState) => {
      const bookFiltered = prevState.books.filter((b) => book.id === b.id)
      if(bookFiltered.length){
        return{
            books : prevState.books.map(bookItem => {
              if (bookItem.id === book.id ) {
                bookItem.shelf = book.shelf;
              };
              return bookItem;
          }),
          }
      }else{
        return {
          books : [...prevState.books, book]
        }
      }
      
    })
  }

  render() {
    const CurrentlyReading = this.state.books.filter((book) => book.shelf === "currentlyReading");
    const Read = this.state.books.filter((book) => book.shelf === "read");
    const WantToRead = this.state.books.filter((book) => book.shelf === "wantToRead");
    return (
      <div className="app">
        <Switch>
          <Route path='/home' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf name="Currently Reading" bookslist={CurrentlyReading} updateBook={this.updateBook}/>
                  <BookShelf name="Read" bookslist={Read} updateBook={this.updateBook}/>
                  <BookShelf name="Want To Read" bookslist={WantToRead} updateBook={this.updateBook}/>
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>
          <Route path='/search' render={() => (
            <Search updateBookList={this.updateBookList} bookslist={this.state.books}/>
          )}/>
          <Redirect to='/home'/>
        </Switch>
      </div>
    );
  };
};

export default BooksApp;
