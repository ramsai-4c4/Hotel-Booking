import "./Singlehotel.css";
import MailList from "../../Components/MailList/MailList";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Reserve from "../Reserve/Reserve";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation,useNavigate } from "react-router-dom";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";

const Singlehotel = () => {
  const location=useLocation();
  const [open,setOpen]=useState(false)
  const hotelid=location.pathname.split("/")[2]
  const {data,loading}=useFetch(`http://localhost:8000/hotel/find/${hotelid}`);
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];
  const navigate=useNavigate()
  const MSPD=1000*60*60*24;
  function dayDifference(date1,date2){
    const timeD=Math.abs(date2?.getTime()-date1?.getTime())
    const diffD=Math.ceil(timeD/MSPD)
    return diffD
  }
  const dates=useSelector((state)=>state.date)
  console.log(dates)
  const user=useSelector((state)=>state.user)
  const options=useSelector((state)=>state.options)
  const days=dayDifference(dates[0]?.startDate,dates[0]?.endDate)
  console.log(days)
  const handleclick=()=>{
    if(user){
      setOpen(true)
    }
    else{
      navigate("/login")
    }
  }

  return (
    <div>
      
      <Header type="list" />
      {loading ? "Loading Data":<>
      <div className="hotelContainer">
       
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – 500m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                Street Apartments has accommodations with air conditioning and
                free WiFi. The units come with hardwood floors and feature a
                fully equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                airport is John Paul II International Kraków–Balice, 16.1 km
                from Tower Street Apartments, and the property offers a paid
                airport shuttle service.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days*data.cheapestPrice*options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleclick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      
      
      </>}
      {open && <Reserve setOpen={setOpen} id={hotelid}/>}
    </div>
  );
};

export default Singlehotel;