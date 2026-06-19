import Image from "next/image";

import { useEffect, useState } from "react";
import { getMenu, MenuCategory, MenuItem } from "../../lib/menu";

export default function LandingMenu() {
    const [menu, setMenu] = useState<MenuCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMenu() {
            try {
                const data = await getMenu();
                setMenu(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadMenu();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (!menu || menu.length === 0) {
        return <p>No menu found</p>;
    }

    const burgers = menu[0];

    return (
        <div className="productos">

            {burgers?.items!.map((item: MenuItem) => {
                return (
                    <div className="producto1" key={item.id}>
                        <Image src={item.image} alt="#" width={300} height={200} className="papapleto" />
                        <div className="tit">
                            <p>{item.name}</p>
                            <span className="precios">${item.price}</span>
                        </div>
                        <div className="descripcion"><p>{item.description}</p></div>
                        <div className="ordenar">
                            <button className="agregar"> AGREGAR </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}