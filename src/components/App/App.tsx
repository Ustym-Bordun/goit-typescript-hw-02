import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import fetchPhotos from '../../service/imageApi';

import Section from '../Section/Section';
import Container from '../Container/Container';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import NothingSearched from '../NothingSearched/NothingSearched';
import ZeroPhotosFound from '../ZeroPhotosFound/ZeroPhotosFound';
import TotalPhotosInfo from '../TotalPhotosInfo/TotalPhotosInfo';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ClearPhotosBtn from '../ClearPhotosBtn/ClearPhotosBtn';
import ImageModal from '../ImageModal/ImageModal';

import css from './App.module.css';

import { Article } from '../../types/article';

function App() {
  const [photosData, setPhotosData] = useState<Article[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [photosTerm, setPhotosTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPageNum, setLastPageNum] = useState<number>(0);
  const [totalPhotosNum, setTotalPhotosNum] = useState<number>(0);
  const [somethingSearched, setSomethingSearched] = useState<boolean>(false);

  const [photoForModal, setPhotoForModal] = useState<null | string>(null);
  const [modalAltDescription, setModalAltDescription] = useState<null | string>(
    null
  );

  const handleSubmit = (searchQuery: string): void => {
    const uniqueQueryId = nanoid();
    setPhotosTerm(`${searchQuery}|${uniqueQueryId}`);
    setCurrentPage(1);
    setPhotosData([]);
    setIsLoading(true);
  };

  useEffect(() => {
    if (photosTerm === '') return;

    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { results, total_pages, total } = await fetchPhotos(
          photosTerm.split('|')[0],
          currentPage
        );
        setPhotosData(prevPhotos => [...prevPhotos, ...results]);

        setLastPageNum(total_pages);
        setTotalPhotosNum(total);
      } catch (error) {
        console.log('there was an error', error);
        setError(true);
      } finally {
        setSomethingSearched(true);
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [photosTerm, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleClearPhotos = () => {
    setPhotosData([]);
    setSomethingSearched(false);
  };
  const handleOpenModal = (
    modalPhotoUlr: string,
    altDescriptionForModal: string
  ) => {
    setPhotoForModal(modalPhotoUlr);
    setModalAltDescription(altDescriptionForModal);
  };
  const handleCloseModal = () => {
    setPhotoForModal(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />

      <Section>
        <Container>
          <div className={css.galleryWrapper}>
            <h1 className={css.galleryTitle}>Search gallery</h1>
            {error ? (
              <ErrorMessage />
            ) : photosData.length > 0 ? (
              <>
                <div className={css.galleryWrapperTop}>
                  <TotalPhotosInfo
                    query={photosTerm.split('|')[0]}
                    totalPhotos={totalPhotosNum}
                  />
                  <ClearPhotosBtn onClearPhotos={handleClearPhotos} />
                </div>

                <ImageGallery
                  photos={photosData}
                  onOpenModal={handleOpenModal}
                />

                {isLoading && <Loader />}

                {photosData.length > 0 &&
                  lastPageNum > currentPage &&
                  !isLoading && <LoadMoreBtn onloadMore={handleLoadMore} />}
              </>
            ) : isLoading ? (
              <Loader />
            ) : somethingSearched ? (
              <ZeroPhotosFound query={photosTerm.split('|')[0]} />
            ) : (
              <NothingSearched />
            )}
          </div>
        </Container>
      </Section>

      <ImageModal
        photo={photoForModal}
        onModalClose={handleCloseModal}
        altDescription={modalAltDescription}
      />
    </>
  );
}

export default App;
