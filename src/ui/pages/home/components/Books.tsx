import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonButton from '../../../components/CommonButton';
import bookApi from '../../../../api/bookApi';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { setBooks, setPagesQuantity } from '../../../../store/bookReducer';
import { Book, QuerySearchOptions } from '../../../../types';
import BooksWrapper from '../styles/Books.styles';
import { setGenres } from '../../../../store/genreReducer';
import constants, { routePath } from '../../../../constants';
import useQuery from '../../../../utils/useQuery';
import Rating from '../../../components/Rating';

const BooksList = () => {
  const books = useAppSelector((state) => state.bookReducer.books);
  const dispatch = useAppDispatch();
  const [parsedParams] = useQuery<QuerySearchOptions>();

  useEffect(() => {
    (async () => {
      try {
        const response = await bookApi.getAllBooks(parsedParams);

        dispatch(setBooks(response.data.books));
        const pagesQuantity = Math.ceil(
          response.data.pagesQuantity / constants.booksQuantityPerPage,
        );
        dispatch(setPagesQuantity(pagesQuantity));
      } catch (err) {
        console.log('ERROR >>', err);
      }
    })();
  }, [dispatch, parsedParams]);

  useEffect(() => {
    (async () => {
      const response = await bookApi.getAllGenres();
      dispatch(setGenres(response.data.genres));
    })();
  }, [dispatch]);

  return (
    <BooksWrapper>
      {books.map((book: Book) => {
        return (
          <div
            className="book"
            key={book.bookId}
          >
            <Link to={{ pathname: `${routePath.product}/${book.bookId}` }}>
              <img
                src={book.cover}
                className="cover"
                alt="book cover"
              />
              <p className="title">
                {book.title}
              </p>
            </Link>
            <p className="author">
              {book.author}
            </p>
            <div className="rating">
              <Rating
                rate={book.averageRate}
                isChangeRating={false}
                book_id={book.bookId}
              />
              <div className="average_rating">
                {book.averageRate}
              </div>
            </div>
            <CommonButton
              size="container"
              text={`$${book.price} USD`}
            />
          </div>
        );
      }) || null}
    </BooksWrapper>
  );
};

export default BooksList;