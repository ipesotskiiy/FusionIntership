import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { routePath } from '../../../constants';
import { BooksArray, Book } from '../../../types';
import CommonButton from '../CommonButton/CommonButton';
import Rating from '../Rating/Rating';
import BooksWrapper from './Books.styles';
import favoriteUnchoosenIcon from '../../images/fav_unchoosen.png';
import favoriteChoosenIcon from '../../images/favorites.png';
import { useAppSelector } from '../../../store';
import bookApi from '../../../api/bookApi';

type BookProps = {
  booksArray: BooksArray;
  wrap: 'wrap' | 'nowrap';
  handleFavorites?: (id: number) => void;
}

const BooksRender: React.FC<BookProps> = (props) => {
  const navigate = useNavigate();
  const [favoritesIds, setFavoritesIds] = useState<number[]>([]);
  const user = useAppSelector((state) => state.userReducer.user);

  useEffect(() => {
    const updatedFavoritesIds: number[] = [];
    props.booksArray.forEach((book) => {
      if (book.isInFavorite) {
        updatedFavoritesIds.push(book.bookId);
      }
    });
    setFavoritesIds(updatedFavoritesIds);
  }, [props.booksArray]);

  const handleClickOnFavorite = async (bookId: number) => {
    if (!user) {
      navigate(routePath.signIn);
    }
    try {
      const indexInFavorites = favoritesIds.indexOf(bookId);
      if (indexInFavorites !== -1) {
        await bookApi.removeFromFavorite({ bookId });
        setFavoritesIds((favorites) => favorites.filter((id) => {
          return id !== bookId;
        }));
        if (props.handleFavorites) {
          props.handleFavorites(bookId);
        }
      } else {
        await bookApi.addToFavorite({ bookId });
        setFavoritesIds([...favoritesIds, bookId]);
      }
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  return (
    <BooksWrapper
      wrap={props.wrap}
    >
      {props.booksArray.map((book: Book) => {
        return (
          <div
            className="book"
            key={book.bookId}
          >
            <Link
              className="book__link"
              to={{ pathname: `${routePath.product}/${book.bookId}` }}>
              <img
                src={book.cover}
                className="book__cover"
              />
              <p className="book__title">
                {book.title}
              </p>
            </Link>
            {favoritesIds.includes(book.bookId)
              ? (<img
                className="book__favorite"
                src={favoriteChoosenIcon}
                onClick={() => handleClickOnFavorite(book.bookId)}
              />)
              : (<img
                className="book__favorite"
                src={favoriteUnchoosenIcon}
                onClick={() => handleClickOnFavorite(book.bookId)}
              />)
            }
            <p className="book__author">
              {book.author}
            </p>
            <div className="book__rating">
              <Rating
                rate={book.averageRate}
                isChangeRating={false}
                bookId={book.bookId}
              />
              <div className="book__average-rating">
                {book.averageRate}
              </div>
            </div>
            <CommonButton
              size="container"
              text={`$${book.price} USD`}
            />
          </div>
        );
      })}
    </BooksWrapper>
  );
};

export default BooksRender;