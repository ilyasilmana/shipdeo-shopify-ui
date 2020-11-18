import style from './topbar.module.css';

export default function Layout() {
  return (
    <div className={style.topBar}>
      <div className={style.topBarLogoWrapper}>      
        <img src="/img/shipdeo@3x.png" className={style.topBarLogo}/>
      </div>
      <a href={'#'} className={style.topBarBack}>Back to Shopify</a>
    </div>
  )
}
