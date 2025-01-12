import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

const MealPlanCalendar = () => {
  return (
    <div className="calendar-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        height="100%" /* Makes the calendar fill the container height */
        width="100%" /* Makes the calendar fill the container width */
        events={[]} /* Replace with your event data */
      />
    </div>
  );
};

export default MealPlanCalendar;
