import { Frame } from "@shopify/polaris";
import TopBar from './topbar/topbar';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';

import styles from './layout.module.css';

export default function Layout(props) {
  return (
    <Frame>
      <TopBar/>
      <Navbar/>
      <div className={styles.contentWrapper}>
        {props.children}
        <Footer/>
      </div>
    </Frame>
  )
}
