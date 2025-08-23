import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import styles from './Header.module.scss';

import logo from '../../assets/LogoPlannr.png';

function Header() {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src={logo} alt="Logo Plannr" />
            <AccountCircleIcon fontSize='large' />
        </header>
    )
}

export default Header;