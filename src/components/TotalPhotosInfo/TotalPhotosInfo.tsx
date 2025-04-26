import css from './TotalPhotosInfo.module.css';

type TotalPhotosInfoProps = {
  totalPhotos: number;
  query: string;
};

const TotalPhotosInfo: React.FC<TotalPhotosInfoProps> = ({
  totalPhotos,
  query,
}) => {
  return (
    <p className={css.text}>
      We found {totalPhotos} "{query}" photos
    </p>
  );
};

export default TotalPhotosInfo;
