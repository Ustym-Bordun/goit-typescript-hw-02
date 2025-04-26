import css from './ZeroPhotosFound.module.css';

interface ZeroPhotosFoundProps {
  query: string;
}

const ZeroPhotosFound: React.FC<ZeroPhotosFoundProps> = ({ query }) => {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>Sorry but there is no photos by this query</p>
      <span className={css.span}> '{query}' </span>
    </div>
  );
};

export default ZeroPhotosFound;
