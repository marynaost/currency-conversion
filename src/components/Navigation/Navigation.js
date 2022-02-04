import { NavLink, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import s from './Navigation.module.scss';

export default function Navigation() {
  return (
    <div>
      <nav className={s.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? s.active : s.item)}
        >
          Currency converter
        </NavLink>
        <NavLink
          to="current-rate"
          className={({ isActive }) => (isActive ? s.active : s.item)}
        >
          Current rate
        </NavLink>
      </nav>
      <Outlet />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
