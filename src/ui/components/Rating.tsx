import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Rating as RatingStars } from 'react-simple-star-rating';
import emptyStarIcon from '../images/Star.png';
import filledStarIcon from '../images/StarFilled.png';
import { useAppSelector } from '../../store';
import bookApi from '../../api/bookApi';

const RatingWrapper = styled.div`
  .star {
    margin: 0 17.5px 0 0;
  }

  @media (max-width: 1279px) {
    .star {
      width: 23px;
      height: 23px;
    }

  @media (max-width: 833px) {
    .star {
      width: 14px;
      height: 14px;
    }
  }
`;

type RatingProps = {
  book_id: number,
  rate: number,
  isChangeRating: boolean,
  handleChangeRating?: () => void,
}

const Rating: React.FC<RatingProps> = (props) => {
  const user = useAppSelector((state) => state.userReducer.user);
  const [rating, setRating] = useState(props.rate || 0);
  console.log('rating', rating);

  useEffect(() => {
    if (props.isChangeRating) {
      console.log('props.isChangeRating', props.isChangeRating);
      setRating(0);
    }
  }, [props.isChangeRating]);

  const updateRating = async (newRate: number) => {
    try {
      if (!user) {
        return;
      }
      await bookApi.setRating({
        book_id: props.book_id,
        rating: newRate,
        user_id: user.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRating = (rate: number) => {
    setRating(rate / 20);
    if (!props.handleChangeRating) return;
    props.handleChangeRating();
    updateRating(rate / 20);
  };

  return (
    <RatingWrapper>
      <RatingStars
        onClick={handleRating}
        ratingValue={rating * 20}
        allowHalfIcon={false}
        readonly={!props.isChangeRating}
        fullIcon={
          <img
            src={filledStarIcon}
            className="star"
          />}
        emptyIcon={
          <img
            src={emptyStarIcon}
            className="star"
          />}
      />
    </RatingWrapper>
  );
};

export default Rating;
