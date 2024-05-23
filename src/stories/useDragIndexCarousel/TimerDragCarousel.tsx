import useDragIndexCarousel from '../../useDragIndexCarousel/useDragIndexCarousel';
import useInterval from '../../useInterval/useInterval';

import React, { useEffect } from 'react';
import { carouselDiv, carouselImage, carouselWrapper } from './DragCarousel.css';

export default function TimerDragCarousel() {
  const images = [
    'https://i.namu.wiki/i/8BAuDmjlFbHoGpGTyTUJyeIsrWw7vrGKTvbOBS1DbaLNHHFL6D05TSZEyVGGffn_RIs6zrf4jCb5Xq5Lnbs8QQ.webp',
    'https://cdn.topstarnews.net/news/photo/202208/14724511_938042_3651.jpg',
    'https://image.xportsnews.com/contents/images/upload/article/2023/0825/mb_1692925582785123.jpg',
    'https://cdn.entermedia.co.kr/news/photo/202210/30302_58507_3849.jpg',
  ];
  const { CarouselWrapper, ref, next, isDragging } = useDragIndexCarousel(images.length, {
    infinity: true,
  });
  const { continueTimer, stop } = useInterval(next, 3000);
  useEffect(() => {
    if (isDragging) stop();
    else continueTimer();
  }, [isDragging]);

  return (
    <CarouselWrapper ref={ref} className={carouselWrapper}>
      {images.map((image) => (
        <div key={image} className={carouselDiv}>
          <img src={image} draggable={false} className={carouselImage} />
        </div>
      ))}
    </CarouselWrapper>
  );
}
