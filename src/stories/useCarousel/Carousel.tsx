import useCarousel from '../../useCarousel/useCarousel';
import React from 'react';
export default function Carousel() {
  const images = [
    'https://i.namu.wiki/i/8BAuDmjlFbHoGpGTyTUJyeIsrWw7vrGKTvbOBS1DbaLNHHFL6D05TSZEyVGGffn_RIs6zrf4jCb5Xq5Lnbs8QQ.webp',
    'https://cdn.topstarnews.net/news/photo/202208/14724511_938042_3651.jpg',
    'https://image.xportsnews.com/contents/images/upload/article/2023/0825/mb_1692925582785123.jpg',
    'https://photo.newsen.com/news_photo/2022/08/19/202208190935355510_1.jpg',
  ];
  const { next, prev, CarouselWrapper, ref, isEnd, isStart } = useCarousel(
    images.length
  );

  return (
    <div
      style={{
        display: 'flex',
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button onClick={prev} disabled={isStart}>
        &lt;
      </button>
      <CarouselWrapper
        ref={ref}
        style={{
          width: 800,
          height: 600,
        }}
      >
        {images.map((image) => (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
            }}
          >
            <img
              src={image}
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        ))}
      </CarouselWrapper>
      <button onClick={next} disabled={isEnd}>
        &gt;
      </button>
    </div>
  );
}
