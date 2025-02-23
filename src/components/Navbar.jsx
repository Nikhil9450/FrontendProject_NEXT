import Link from "next/link";
import styles from "./Navbar.module.css"; // Import CSS module

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}><Link href="/" style={{textDecoration:'none !important'}}>Home</Link></div>
      <ul className={styles.navLinks}>
        {/* <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
