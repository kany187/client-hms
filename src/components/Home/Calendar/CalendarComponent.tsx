import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import useAppointment from "../../../hooks/appointments/useAppointment";

import "./Calendar.css";
import moment from "moment";

export const CalendarComponent = () => {
  const { data } = useAppointment();

  const event = data?.map((app) => {
    const startDate = moment(`${app.startDate} ${app.startTime}`).toDate();
    //const endDate = moment(`${app.endDate} ${app.endTime}`).toDate();

    return {
      id: app._id,
      title: app.title,
      start: new Date(app.startDate),
      //end: new Date(app.endDate),
    };
  });

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          right: "prev,next",
        }}
        events={event}
      />
    </div>
  );
};
