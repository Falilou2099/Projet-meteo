const MiniMap = ({ city }) => {
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBe8rS5IqzeZRjYPKfr4Jt--IPr_TnV0aQ&q=${city}`;
  
    return (
      <iframe
        src={mapUrl}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    );
  };
  
  export default MiniMap;