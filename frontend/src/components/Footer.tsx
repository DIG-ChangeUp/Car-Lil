import {
  MdMoreHoriz,
  MdNotificationsNone,
  MdOutlineCalendarMonth,
  MdOutlineDirectionsCar,
  MdOutlineListAlt,
  MdPersonOutline,
} from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-icons">
        <MdOutlineCalendarMonth />
        <MdOutlineDirectionsCar />
        <MdOutlineListAlt />
        <MdPersonOutline />
        <MdNotificationsNone />
        <MdMoreHoriz />
      </div>
    </footer>
  );
}
