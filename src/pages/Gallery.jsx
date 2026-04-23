import { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import GalleryGrid from '../components/GalleryGrid';
import Loader from '../components/Loader';
import { getGallery } from '../api/galleryApi';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await getGallery();
        setImages(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="pt-32 pb-20 section-padding min-h-screen">
      <div className="container mx-auto">
        <SectionHeading title="Gallery" subtitle="Moments captured at AIIC events and hackathons." centered />
        {images.length > 0 ? (
          <GalleryGrid images={images} />
        ) : (
          <div className="text-center text-text-secondary py-12">No images available in the gallery.</div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
