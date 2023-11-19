
import React, { useState, useRef } from 'react';
import { Carousel } from 'antd';
import { NewBookingForm } from './Form/NewBookingForm'
import { BookingConfirmation } from './NewBookingConfirmation'

const carouselHeightInactive = {
  height: 0,
  overflow: 'hidden'
}

export const NewBookingFlow = (props) => {
  const carouselRef = useRef()
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [bookingDetails, setBookingDetails] = useState({})

  const onBeforeChangeCarousel = (current, next) => {
    setCarouselIndex(next);
  }

  const setCarouselSlideHeight = (slideIndex) => {
    return carouselIndex !== slideIndex ? carouselHeightInactive : {}
  }

  const goToCarouselIndex = (index) => {
    carouselRef.current.goTo(index)
  }

  const collectFormData = (formData) => {
    setBookingDetails(formData)
    goToCarouselIndex(1)
  }

  const submitBooking = () => {
    props.submitFn(bookingDetails.formData)
  }
  
  return (
    <Carousel 
      dots={false}
      ref={carouselRef}
      beforeChange={onBeforeChangeCarousel}>
      <div>
        <div style={setCarouselSlideHeight(0)}>
          <NewBookingForm returnFormData={collectFormData} />
        </div>
      </div>
      <div>
        <div style={setCarouselSlideHeight(1)}>
          <BookingConfirmation 
            {...bookingDetails} 
            submitBooking={submitBooking}
            backButtonAction={() => goToCarouselIndex(0)} />
        </div>
      </div>
    </Carousel>
  )
}