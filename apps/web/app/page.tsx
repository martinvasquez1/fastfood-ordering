import Image from "next/image";

type MenuItem = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
};

type MenuCategory = {
    category: string;
    items: MenuItem[];
};

export async function getMenu(): Promise<MenuCategory[]> {
    const res = await fetch(
        "http://localhost:3002/restaurants/1/menu"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch menu");
    }

    return res.json();
}

export default async function Home() {
    const menu = await getMenu();
    const burgers = menu[0]

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


                <div id="div1">  </div>

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