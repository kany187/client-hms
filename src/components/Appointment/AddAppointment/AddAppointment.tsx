import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./AddAppointment.css";

import { Box, useDisclosure } from "@chakra-ui/react";
import AppointmentComponent from "./AppointmentComponent";
import moment from "moment";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { AddAppointmentForm } from "./AddAppointmentForm";
import { useState } from "react";
import useAppointment from "../../../hooks/appointments/useAppointment";
import { AppointmentDetail } from "./AppointmentDetail";

const AddAppointment = () => {
  const { data, error } = useAppointment();

  const event = data?.map((app) => {
    const startDate = moment(`${app.date} ${app.time}`).toDate();
    //const endDate = moment(`${app.endDate} ${app.endTime}`).toDate();

    return {
      id: app._id,
      title: `${app.type} - ${app.status}`,
      start: new Date(app.date),
      //end: new Date(app.endDate),
    };
  });

  const [dateRange, setDateRange] = useState("");
  const [deptName, setDeptName] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [id, setId] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: open, onOpen: start, onClose: close } = useDisclosure();

  const handleSelect = (selectInfo: DateSelectArg) => {
    const start = selectInfo.startStr;
    const end = selectInfo.endStr;

    let range =
      moment(start).format("MM/DD/YYYY") +
      " - " +
      moment(end).format("MM/DD/YYYY");
    let startDate = moment(start).format("MM/DD/YYYY");
    let endDate = moment(end).format("MM/DD/YYYY HH:mm");

    setDateRange(startDate);

    onOpen();
  };
  const handleClick = (arg: EventClickArg) => {
    setId(arg.event.id);
    start();
  };

  return (
    <>
      <AppointmentComponent
        deptName={setDeptName}
        doctorName={setSelectedDoctor}
      />
      {
        <AddAppointmentForm
          dateRange={dateRange}
          isOpen={isOpen}
          isClose={onClose}
          deptName={deptName}
          doctorName={selectedDoctor}
        />
      }
      <div id="full-calendar">
        <Box>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            aspectRatio={2}
            height={800}
            editable={true}
            selectable={true}
            select={handleSelect}
            events={event}
            eventClick={handleClick}
            // eventTimeFormat={ hour: "numeric", minute: "2-digit", timeZoneName: "short" }
          />
        </Box>
      </div>
      <AppointmentDetail isOpen={open} isClose={close} id={id} />
    </>
  );
};

export default AddAppointment;
