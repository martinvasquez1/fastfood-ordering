import React from "react";
import ShopPrototypePage from "./shopPrototype/page";

export default function Home() {
  return (
    <div>
    <div className="contenido">

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

            <div className="producto1">

                <div className="papapleto"> </div>
                    <div className="tit"> 
                        <p> PAPAPLETO MONSTER </p>
                        <span className="precios"> $4.990 </span>
                    </div>
                        <div className="descripcion"> 
                            <p> Papapleto monster con tocino, jamon, pebre + 2 salsas a 
                              elegir.</p> 

                </div>

                <div className="ordenar"> 

                    <button className="agregar"> AGREGAR </button>

                </div>


            </div>

            <div className="producto1">
                <div className="papamex"> </div>

                <div className="tit"> 
                    <p> PAPA-MEX </p>
                    <span className="precios"> $3.990 </span>
                </div>

                <div className="descripcion"> 
                    <p id="descripcion1"> Papas a la mexicana con chile jalapeño, cilantro, cebolla + una salsa 
                        adicional. </p>
                </div>

                <div className="ordenar"> 

                    <button className="agregar"> AGREGAR </button>
                    
                </div>

            </div>    

            <div className="producto1">
                <div className="sencipapa"> </div>

                <div className="tit"> 
                    <p> SENCI-PAPA </p>
                    <span className="precios"> $1.990 </span>
                </div>

                <div className="descripcion"> 
                    <p> Las que no fallan, papas con queso
                        cheddar para hacer un dippeo de sabor.</p>
                </div>

                <div className="ordenar"> 

                    <button className="agregar"> AGREGAR </button>
                    
                </div>
           
            </div>
    </div>

    </div>
  )
}