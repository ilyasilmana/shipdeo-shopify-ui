import Link from 'next/link';
import { useRouter } from 'next/router';

import conclass from '../../../utils/conclass';
import style from './navbar.module.css';

const NavLink = (props) => (
  <Link href={props.href} passHref>
    <a className={conclass(style.navbarItem, props.active ? style.navbarItemActive : '')}>{props.label}</a>
  </Link>
)

export default function Navbar() {
  const router = useRouter();

  console.log(router.pathname);

  return (
    <div className={style.navbar}>
      <NavLink href="/config" label="Config" active={router.pathname === '/config'}/>
      <NavLink href="/shipping" label="Shipping" active={router.pathname === '/shipping'}/>
      <NavLink href="/payment" label="Payment" active={router.pathname === '/payment'}/>
      <NavLink href="/order" label="Manage Order" active={router.pathname.includes('/order')}/>
    </div>
  )
}
