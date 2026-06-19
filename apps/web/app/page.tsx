"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { getMenu, MenuCategory, MenuItem } from "../lib/menu";

export default function Home() {
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
        <div>
            <div className="contenido hero">
                <div id="rec2"> PAPAREVOLUTION HA LLEGADO A CHILE </div>
                <div className="textos">
                    <p id="text1"> Papapitas? </p>
                    <p id="text2"> Papapitas! </p>
                    <p id="text3"> Disfruta del equilibrio perfecto entre un exterior
                        dorado y ultra crujiente con un interior suave que se deshace en tu boca.
                        Son el snack irresistible que eleva cualquier
                        momento al siguiente nivel de sabor.</p>

                    <div className="inscribir">
                        <button className="agregar2"> Inscribete ya!  </button>
                        <button className="agregar2 boton-secundario"> Nuestra carta  </button>
                    </div>
                </div>
                <Image src="/hero.jpg" alt="Hero" width={800} height={600} id="hero-image" />
            </div>

            <div className="pasos">
                <div className="textos">
                    <p id="step1"> ¿Cómo funciona? </p>
                    <p id="step2"> Sigue estos pasos para ordenar tus papas favoritas: </p>
                </div>

                <div className="pasos2">

                    <div className="paso azul">
                        <div className="circulo azul">1</div>
                        Inscribite
                    </div>

                    <div className="paso amarillo">
                        <div className="circulo amarillo">2</div>
                        Llena tu carrito
                    </div>

                    <div className="paso azul">
                        <div className="circulo azul">3</div>
                        Realiza tu pago
                    </div>

                    <div className="paso amarillo">
                        <div className="circulo amarillo">4</div>
                        Sigue tu pedido
                    </div>

                </div>
            </div>

            <div className="catalogo">
                <div id="cuadro"></div>
                <span className="titulo"> LO MÁS VENDIDO </span>

            </div>

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
        </div>
    )
}