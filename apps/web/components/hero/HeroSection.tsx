'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="contenido hero">
      <div id="rec2">PAPAREVOLUTION HA LLEGADO A CHILE</div>
      <div className="textos">
        <p id="text1">Papapitas?</p>
        <p id="text2">Papapitas!</p>
        <p id="text3">
          Disfruta del equilibrio perfecto entre un exterior dorado y ultra crujiente con un interior suave que se deshace en tu boca.
          Son el snack irresistible que eleva cualquier momento al siguiente nivel de sabor.
        </p>

        <div className="inscribir">
          <button className="agregar2">Inscribete ya!</button>
          <button className="agregar2 boton-secundario">Nuestra carta</button>
        </div>
      </div>
      <Image src="/hero.jpg" alt="Hero" width={800} height={600} id="hero-image" />
    </div>
  );
}
