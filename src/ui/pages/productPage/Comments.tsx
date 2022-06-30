import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { socket } from '../../../App';
import bookApi from '../../../api/bookApi';
import { Book, Comment } from '../../../types';
import CommonButton from '../../components/CommonButton';
import CommentsWrapper from './Comments.styles';
import { useAppSelector } from '../../../store';
import AuthDependentRenderController from '../../components/AuthDependentRenderController';

type CommentsProps = {
  book: Book,
  setBookInState: (data: Book) => void,
}

const Comments: React.FC<CommentsProps> = (props) => {
  const user = useAppSelector((state) => state.userReducer.user);
  const commentsArray = props.book.comments;

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async (value) => {
      try {
        if (!user) { return; }
        const newComment = {
          text: value.text.trim(),
          book_id: props.book.bookId,
          user_id: user.id,
        };
        const response = await bookApi.addComment(newComment);
        value.text = '';

        socket.emit('comment:add', response.data);
      } catch (error) {
        console.log('ERROR>>', error);
      }
    },
  });

  useEffect(() => {
    socket.on('comment:save', (data: Comment) => {
      props.book.comments.push(data);
      const book = { ...props.book };
      props.setBookInState(book);
    });
  }, [socket]);

  const dateToDateAgo = (date: string) => {
    dayjs.extend(relativeTime);
    const newDate = dayjs(date).fromNow();
    return `Left a comment ${newDate}`;
  };

  return (
    <CommentsWrapper>
      <h1 className="title">Comments</h1>
      {commentsArray.length > 0 && <div className="comments">
        {commentsArray.map((comment) => {
          return (
            <div
              key={comment.comment_id}
              className="comment"
            >
              <img src={comment.user.avatar} className="avatar" />
              <div className="content_block">
                <p className="author_name">{comment.user.name}</p>
                <p className="date">{dateToDateAgo(comment.date)}</p>
              </div>
              <p className="text">{comment.text}</p>
            </div>
          );
        })}
      </div>}
      <AuthDependentRenderController>
        <form
          onSubmit={formik.handleSubmit}
          className="comment_form"
        >
          <textarea
            placeholder="Share a comment"
            className="textarea comment"
            rows={3}
            {...formik.getFieldProps('text')}
          />
          <CommonButton
            size="permanent"
            text="Post a comment"
          />
        </form>
      </AuthDependentRenderController>
    </CommentsWrapper>
  );
};

export default Comments;
