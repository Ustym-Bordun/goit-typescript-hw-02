import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

import { Article } from '../../types/article';
import { ModalOpenHandler } from '../../types/modalOpenHandler';

interface ImageGalleryProps {
  photos: Article[];
  onOpenModal: ModalOpenHandler;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ photos, onOpenModal }) => {
  return (
    <ul className={css.list}>
      {photos.map(photo => {
        const {
          id,
          likes,
          description,
          alt_description,
          user: { name },
          urls,
        } = photo;

        return (
          <li key={id}>
            <ImageCard
              likes={likes}
              description={description}
              alt_description={alt_description}
              name={name}
              urls={urls}
              onOpenModal={onOpenModal}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
