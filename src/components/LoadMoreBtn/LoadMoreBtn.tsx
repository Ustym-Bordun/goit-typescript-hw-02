import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onloadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onloadMore }) => {
  return (
    // <div className={css.wrapper}>
    <button className={css.btn} onClick={onloadMore}>
      Load more
    </button>
    // </div>
  );
};

export default LoadMoreBtn;
