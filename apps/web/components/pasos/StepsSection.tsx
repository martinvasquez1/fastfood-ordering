'use client';

export default function StepsSection() {
  return (
    <div className="pasos">
      <div className="textos">
        <p id="step1">¿Cómo funciona?</p>
        <p id="step2">Sigue estos pasos para ordenar tus papas favoritas:</p>
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
  );
}
