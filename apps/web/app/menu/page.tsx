"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { getMenu, MenuCategory, MenuItem } from "../../lib/menu";

export default function Menu() {
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

    const novedad1 = menu[0]?.items[0]
    const novedad2 = menu[1]?.items[0]

    return (
        <div>
            <div id="cuadro"></div>

            <span className="titulo"> NUESTRA CARTA </span>

            <p id="variedad">
                Conoce la variedad en nuestro menú para que no dejes de
                llenarte de puro sabor!
            </p>

            <div id="cuadro2"></div>

            <span className="titulo2"> NOVEDADES </span>

            <div className="productos2">
                <div className="novedad">
                    <Image src={novedad1?.image!} alt="#" width={300} height={200} className="img-novedad" />
                    <div className="info">
                        <div className="des">
                            <p id="brocheta">{novedad1?.name}</p>
                            <p className="precio">${novedad1?.price}</p>
                        </div>
                        <p className="des">{novedad1?.description}</p>
                        <div className="boton">
                            <button className="agregar">AGREGAR</button>
                        </div>
                    </div>
                </div>

                <div className="novedad prod-dos">

                    <div className="prod2">
                        <Image src={novedad2?.image!} alt="#" width={300} height={200} className="img2" />
                    </div>

                    <div className="textt">
                        <p className="papascrema">{novedad2?.name}</p>
                        <p className="precio">${novedad2?.price}</p>
                    </div>

                    <p className="des">{novedad2?.description}</p>

                    <div className="boton2">
                        <button className="agregar boton-secundario2">
                            AGREGAR
                        </button>
                    </div>

                </div>

            </div>

            {/* LO MÁS VENDIDO */}
            <div className="catalogo">
                <div id="cuadro"></div>
                <span className="titulo">LO MÁS VENDIDO</span>
            </div>

            <div className="productos">

                <div className="producto1">
                    <div className="papapleto"></div>

                    <div className="tit">
                        <p>PAPAPLETO MONSTER</p>
                        <span className="precios">$4.990</span>
                    </div>

                    <div className="descripcion">
                        <p>
                            Papapleto monster con tocino, jamón, pebre + 2 salsas
                        </p>
                    </div>

                    <div className="ordenar">
                        <button className="agregar">AGREGAR</button>
                    </div>
                </div>

                <div className="producto1">
                    <div className="papamex"></div>

                    <div className="tit">
                        <p>PAPA-MEX</p>
                        <span className="precios">$3.990</span>
                    </div>

                    <div className="descripcion">
                        <p>
                            Papas a la mexicana con jalapeño, cilantro, cebolla
                        </p>
                    </div>

                    <div className="ordenar">
                        <button className="agregar">AGREGAR</button>
                    </div>
                </div>

                <div className="producto1">
                    <div className="sencipapa"></div>

                    <div className="tit">
                        <p>SENCI-PAPA</p>
                        <span className="precios">$1.990</span>
                    </div>

                    <div className="descripcion">
                        <p>
                            Papas con queso cheddar para dippeo de sabor
                        </p>
                    </div>

                    <div className="ordenar">
                        <button className="agregar">AGREGAR</button>
                    </div>
                </div>

            </div>

            {/* SALSAS */}
            <div className="salsas">
                <div id="cuadrosalsas"></div>
                <span className="titulo">SALSAS</span>
            </div>

            <div className="salsas2">

                <div className="salsa-card">
                    <div className="prod3">
                        <img src="Imagenes/queso.jfif" className="img3" />
                    </div>

                    <h3 className="salsa-titulo">Salsa de Queso</h3>
                    <p className="salsa-desc">Cremosa y caliente</p>
                    <span className="salsa-precio">$990</span>
                    <button className="btn-comprar">Comprar</button>
                </div>

                <div className="salsa-card">
                    <img src="Imagenes/guacamole.jpg" className="img3" />

                    <h3 className="salsa-titulo">Guacamole</h3>
                    <p className="salsa-desc">Aguacate fresco con limón</p>
                    <span className="salsa-precio">$1.190</span>
                    <button className="btn-comprar">Comprar</button>
                </div>

                <div className="salsa-card">
                    <img src="Imagenes/ajo.jfif" className="img3" />

                    <h3 className="salsa-titulo">Salsa de Ajo</h3>
                    <p className="salsa-desc">Intensa y casera</p>
                    <span className="salsa-precio">$890</span>
                    <button className="btn-comprar">Comprar</button>
                </div>

                <div className="salsa-card">
                    <img src="Imagenes/mayo.jfif" className="img3" />

                    <h3 className="salsa-titulo">Mayonesa</h3>
                    <p className="salsa-desc">Clásica y suave</p>
                    <span className="salsa-precio">$790</span>
                    <button className="btn-comprar">Comprar</button>
                </div>

            </div>

            {/* BEBIDAS */}
            <div className="bebidas">
                <div id="cuadrobebidas"></div>
                <span className="titulo">BEBIDAS</span>
            </div>

            <div className="bebidas2">

                <div className="limonada">
                    <img src="Imagenes/limonada.jpg" className="lim" />

                    <div className="desc-bebidas">
                        <p className="t2">Limonada</p>
                        <button className="btn-limon">+</button>
                    </div>

                    <div className="text-limonada">
                        <p className="t1">
                            Disfruta nuestra limonada 100% natural
                        </p>
                        <p className="price">$1.990</p>
                    </div>
                </div>

                <div className="limonada">
                    <img src="Imagenes/mojito.jfif" className="lim" />

                    <div className="desc-bebidas">
                        <p className="t2">Mojito</p>
                        <button className="btn-limon">+</button>
                    </div>

                    <div className="text-limonada">
                        <p className="t1">
                            Por qué no un Mojito después de tus PapaPitas?
                        </p>
                        <p className="price">$1.990</p>
                    </div>
                </div>

            </div>

        </div>
    );
}