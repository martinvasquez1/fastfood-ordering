import { Menu, MapPin, PhoneCall } from 'lucide-react';
import styles from './footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.menuu}>
                <li className={styles['menu-elem']}>
                    <a href="/menu" className={styles['menu-icon']}>
                        <Menu size={18} />
                        <span>Menú</span>
                    </a>
                </li>
                <li className={styles['menu-elem']}>
                    <a href="/ubicaciones" className={styles['menu-icon']}>
                        <MapPin size={18} />
                        <span>Ubicaciones</span>
                    </a>
                </li>
                <li className={styles['menu-elem']}>
                    <a href="/contacto" className={styles['menu-icon']}>
                        <PhoneCall size={18} />
                        <span>Contacto</span>
                    </a>
                </li>
            </ul>
            <div className={styles['footer-texts']}>
                <p className={styles.texto}>® PAPAPITA</p>
                <p className={styles.texto}>2026 | Todos los derechos reservados</p>
            </div>
        </footer>
    );
}