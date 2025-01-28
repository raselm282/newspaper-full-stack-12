import React from 'react';
import Slide from './Slide';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import bg_img1 from '../../assets/news-1.jpg'
import bg_img2 from '../../assets/news-2.jpg'
import bg_img3 from '../../assets/news-3.jpg'

const SwiperSlider = () => {
    return (
        <div className='container px-6 py-10 mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bg_img1}
            text='A trusted source for breaking news, politics, entertainment, and sports, delivering in-depth stories and updates from around the world.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bg_img2}
            text='Your go-to newspaper for daily insights on current events, local happenings, and global trends, keeping readers informed and engaged every day'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bg_img3}
            text='Comprehensive coverage of international affairs, business, culture, and technology, providing readers with balanced perspectives and expert analysis on the world’s pressing issues.'
          />
        </SwiperSlide>
      </Swiper>
    </div>
    );
};

export default SwiperSlider;