import css from './ClearPhotosBtn.module.css';

interface ClearPhotosBtnProps {
  onClearPhotos: () => void; // функція без аргументів, нічого не повертає
}

const ClearPhotosBtn: React.FC<ClearPhotosBtnProps> = ({ onClearPhotos }) => {
  return (
    <button className={css.btn} onClick={onClearPhotos}>
      Clear photos
    </button>
  );
};

export default ClearPhotosBtn;
