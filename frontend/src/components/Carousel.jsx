export default function Carousel() {
    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

            <div className="carousel-inner " id='carousel'>
                <div className="carousel-item active" >
                    <img src="https://media.istockphoto.com/id/1211554164/photo/3d-render-of-home-appliances-collection-set.jpg?s=612x612&w=0&k=20&c=blm3IyPyZo5ElWLOjI-hFMG-NrKQ0G76JpWGyNttF8s=" className="d-block w-100  " style={{ filter: "brightness(70%)", height: "350px", objectFit: "cover" }} alt="..." />
                </div>
                <div className="carousel-item" >
                    <img src="https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100  " style={{ filter: "brightness(70%)", height: "350px", objectFit: "cover" }} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 " style={{ filter: "brightness(70%)", height: "350px", objectFit: "cover" }} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 " style={{ filter: "brightness(70%)", height: "350px", objectFit: "cover" }} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 " style={{ filter: "brightness(70%)", height: "350px", objectFit: "cover" }} alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
} 
