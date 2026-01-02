import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

function Home() {
    return(
        <>
            <div className="container">
            <div className="row">
                <div className='w-100 h-100'>
                    <Swiper modules={[Autoplay]}
                        autoplay={{
                            delay: 5000, // Delay between transitions in ms (default is 3000ms)
                            disableOnInteraction: false, // Autoplay won't stop after user's first interaction (swipe)
                        }}
                        spaceBetween={50}
                        slidesPerView={1}
                        
                        className='w-100 h-100'>
                        <SwiperSlide className='w-100 h-100'><img src="https://plus.unsplash.com/premium_photo-1663039959498-62f6f9fbea38?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="object-cover w-100 h-100" /></SwiperSlide>
                        <SwiperSlide className='w-100 h-100'><img src='https://plus.unsplash.com/premium_photo-1705433052912-5e6135454dc2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="object-cover w-100 h-100" /></SwiperSlide>
                        <SwiperSlide className='w-100 h-100'><img src='https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="object-cover w-100 h-100" /></SwiperSlide>
                        <SwiperSlide className='w-100 h-100'><img src='https://plus.unsplash.com/premium_photo-1700590072635-e1719c1a50f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'className="object-cover w-100 h-100" /></SwiperSlide>
                        <SwiperSlide className='w-100 h-100'><img src='https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'className="object-cover w-100 h-100"/></SwiperSlide>
                        <SwiperSlide className='w-100 h-100'><img src='https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="object-cover w-100 h-100"/></SwiperSlide>
                        <SwiperSlide className='w-100 h-100'><img src='https://plus.unsplash.com/premium_photo-1676473229512-903bbbb1dd1d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='object-cover w-100 h-100'></img></SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-6 mt-md-4">
                <div className="card border-0 mb-4 position-relative position-relative">
                    <img
                    src="https://images.unsplash.com/photo-1531919817409-f72e859fcfcf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="card-img-top rounded-0 card-img-fixed"
                    alt="..."
                    />
                    <div className="card-body p-0">
                    
                    <div className="d-flex justify-content-between mt-3">
                        <p className="card-text text-muted mb-0 w-75">
                            當感覺到盜汗的時候....
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-6 mt-md-4">
                <div className="card border-0 mb-4 position-relative position-relative">
                    <img src="https://plus.unsplash.com/premium_photo-1668487827029-2bd54133c303?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top rounded-0 card-img-fixed" alt="..."
                    />
                    <div className="card-body p-0">
                    
                    <div className="d-flex justify-content-between mt-3">
                        <p className="card-text text-muted mb-0 w-75">
                            當感覺到心跳加快的時候...
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-6 mt-md-4">
                <div className="card border-0 mb-4 position-relative position-relative">
                    <img
                    src="https://images.unsplash.com/photo-1604418890235-8a217e97ec15?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="card-img-top rounded-0 card-img-fixed"
                    alt="..."
                    />
                    <div className="card-body p-0">
                    
                    <div className="d-flex justify-content-between mt-3">
                        <p className="card-text text-muted mb-0 w-75">
                            當感覺頭暈、視線模糊的時候...
                        </p>
                        
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-6 mt-md-4">
                <div className="card border-0 mb-4 position-relative position-relative">
                    <img src="https://images.unsplash.com/photo-1529973565457-a60a2ccf750d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top rounded-0 card-img-fixed" alt="..."
                    />
                    <div className="card-body p-0">
                    
                    <div className="d-flex justify-content-between mt-3">
                        <p className="card-text text-muted mb-0 w-75">
                            當感覺非常飢餓的時候...
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="bg-light mt-7">
            <div className="container">
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <div className="row justify-content-center py-7">
                        <div className="col-md-8 d-flex">
                        <img src="https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="rounded-circle me-5" style={{width: "160px", height: "160px", objectFit: "cover"}} />
                        <div className="d-flex flex-column">
                            <p className="mt-auto text-muted">當感覺到飢餓、盜汗、顫抖或虛弱無力等症狀</p>
                            <p className="h4 text-end">“讓血糖飆升吧!”</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Home;