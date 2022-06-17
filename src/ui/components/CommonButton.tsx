import React from 'react';
import CommonButtonWrapper from '../styles/CommonButton.styled';

type ButtonProps = {
  size?: 'container' | 'small' | 'common' | 'permanent'
  text?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const CommonButton: React.FC<ButtonProps> = (props) => {
  const { type = 'submit' } = props;

  return (
    <CommonButtonWrapper
      size={props.size || 'common'}
      type={type}
      onClick={props.onClick}
    >
      {props.text}
    </ CommonButtonWrapper>
  );
};

export default CommonButton;
