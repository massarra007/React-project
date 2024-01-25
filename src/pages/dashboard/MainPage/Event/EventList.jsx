import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { fDate } from "../../../../functions/formatTime";
import EventService from "../../../../services/EventService";
import { Link, useNavigate, useParams } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";
import ParticipationService from "../../../../services/ParticipationService";
import Loading from "../../../../layouts/Loading";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function EventList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [Events, setEvents] = useState([]);
  useEffect(() => {
    EventService.GetAllEvents()
      .then((response) => {
        setEvents(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const onInteresst = (id) => {
    ParticipationService.AddParticipation(id)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  const handleNavigateDetail = (_id) => {
    navigate(`/dash/event/${_id}`);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          data-test="swiper"
        >
          {Events.map((item) => (
            <SwiperSlide>
              <Box
                onClick={(_id) => handleNavigateDetail(item._id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
                  borderRadius: 4,
                  maxWidth: 420,
                  cursor: "pointer",
                  height: 150,
                  margin: 1,
                }}
              >
                <Box
                  sx={{
                    marginLeft: 2,
                  }}
                >
                  <Typography variant="subtitle1" color="primary">
                    {fDate(item.eventDateDebut)}
                  </Typography>

                  <Typography variant="h8">
                    {" "}
                    <b>{item.eventName} </b>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="gray"
                    sx={{ marginTop: 1 }}
                  >
                    <LocationOnIcon fontSize="20" /> {item.location}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default EventList;
