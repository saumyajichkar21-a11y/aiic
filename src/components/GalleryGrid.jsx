import Masonry from 'react-masonry-css';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from 'framer-motion';

const GalleryGrid = ({ images }) => {
  const [index, setIndex] = useState(-1);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  const slides = images.map(img => ({ src: img.imageUrl, title: img.caption || img.eventName }));

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.map((image, i) => (
          <motion.div
            key={image._id || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i % 3 * 0.1 }}
            className="mb-4 relative group cursor-pointer overflow-hidden rounded-xl bg-secondary-bg"
            onClick={() => setIndex(i)}
          >
            <img 
              src={image.imageUrl} 
              alt={image.caption || 'AIIC Event'} 
              className="w-full block hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h4 className="text-white font-heading font-semibold text-sm truncate">{image.eventName}</h4>
              {image.caption && <p className="text-text-secondary text-xs truncate">{image.caption}</p>}
            </div>
            <div className="absolute top-2 right-2 bg-accent-gold/90 text-primary-bg text-xs px-2 py-1 rounded-md font-bold">
              {image.year}
            </div>
          </motion.div>
        ))}
      </Masonry>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </>
  );
};

export default GalleryGrid;
