import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './SobreNos.css';
import { FeedbackModal } from './feedbackModal'
export function SobreNos() {
  const missaoRef = useRef(null);
  const visaoRef = useRef(null);
  const valoresRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (missaoRef.current) observer.observe(missaoRef.current);
    if (visaoRef.current) observer.observe(visaoRef.current);
    if (valoresRef.current) observer.observe(valoresRef.current);

    return () => {
      if (missaoRef.current) observer.unobserve(missaoRef.current);
      if (visaoRef.current) observer.unobserve(visaoRef.current);
      if (valoresRef.current) observer.unobserve(valoresRef.current);
    };
  }, []);

  return (
    <>
      <div className="container">
        <section className="hero-sobre">
          <h1>Conheça a Nossa História</h1>
          <p className="subtitulo">Somos apaixonados por inovação e dedicados a entregar as melhores soluções para nossos clientes.</p>
        </section>

        <section ref={missaoRef} className="secao-mvv secao-missao">
          <div className="conteudo-mvv-dividido">
            <div className="coluna-texto-mvv">
              <div className="icone-mvv">🎯</div>
              <h3>Nossa Missão</h3>
              <blockquote className="declaracao-missao">
                "Conectar pessoas à natureza, uma muda de cada vez, oferecendo o início de uma jornada verdejante e cheia de vida para cada lar."
              </blockquote>
              <p>
                Acreditamos que cada folha nova é um pequeno sopro de esperança e bem-estar. Por isso, nossa missão vai além da venda: dedicamo-nos a cultivar mudas saudáveis e fortes, utilizando práticas sustentáveis que respeitam o meio ambiente.
              </p>
              <ul className="compromissos-lista">
                <li><strong>Qualidade:</strong> Selecionar e nutrir cada muda para garantir um crescimento vigoroso.</li>
                <li><strong>Sustentabilidade:</strong> Adotar práticas que cuidam do nosso planeta para as futuras gerações.</li>
                <li><strong>Apoio:</strong> Oferecer o conhecimento necessário para que sua planta prospere.</li>
              </ul>
            </div>
            <div className="coluna-galeria-mvv">
              <img src="../../assets/segurando-muda.jpeg" alt="Mãos segurando uma muda com cuidado" className="imagem-galeria" />
              <img src="./src/assets/potes-de-mudas.jpg" alt="Viveiro com mudas saudáveis" className="imagem-galeria" />
            </div>
          </div>
        </section>

        <section ref={visaoRef} className="secao-mvv secao-visao">
          <div className="conteudo-mvv-dividido layout-invertido">
            <div className="coluna-galeria-mvv">
              <img src="./src/assets/area-de-refeicoes-ao-ar-livre-com-plantas-e-claraboia.jpg" alt="Varanda de apartamento com muitas plantas" className="imagem-galeria" />
              <img src="./src/assets/plantas-de-interior-em-estudio.jpg" alt="Sala de estar decorada com plantas" className="imagem-galeria" />
            </div>
            <div className="coluna-texto-mvv">
              <div className="icone-mvv">🔭</div>
              <h3>Nossa Visão</h3>
              <blockquote className="declaracao-missao">
                "Ser a semente de um futuro onde cada espaço, do menor apartamento à maior cidade, respire mais verde e inspire uma conexão profunda e diária com a natureza."
              </blockquote>
              <p>
                Aspiramos liderar uma transformação verde, tornando-nos referência não apenas na qualidade de nossas mudas, mas no impacto positivo que elas geram.
              </p>
              <div className="pilares-visao">
                <div className="pilar">
                  <h4>Em Cada Lar</h4>
                  <p>Levar vida para dentro das casas, transformando ambientes em refúgios de bem-estar.</p>
                </div>
                <div className="pilar">
                  <h4>Nas Cidades</h4>
                  <p>Contribuir para o florescimento de varandas e espaços urbanos, tornando-os mais vivos.</p>
                </div>
                <div className="pilar">
                  <h4>Para o Planeta</h4>
                  <p>Fomentar uma comunidade de cultivadores conscientes, promovendo a sustentabilidade.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={valoresRef} className="secao-mvv secao-valores">
          <div className="conteudo-valores">
            <div className="cabecalho-valores">
              <h3>Nossos Valores</h3>
              <p>Estes são os princípios que guiam cada decisão que tomamos, do cultivo da semente à entrega na sua porta.</p>
            </div>
            <div className="grade-valores">
              <div className="card-valor">
                <div className="icone-valor">🌿</div>
                <h4>Qualidade Raiz</h4>
                <p>Nosso compromisso é com a saúde de cada raiz e a vitalidade de cada folha, garantindo que você receba uma muda pronta para prosperar.</p>
              </div>
              <div className="card-valor">
                <div className="icone-valor">🌎</div>
                <h4>Cultivo Sustentável</h4>
                <p>Respeitamos o ciclo da natureza, adotando práticas responsáveis para que nosso crescimento não seja nocivo para o planeta.</p>
              </div>
              <div className="card-valor">
                <div className="icone-valor">🤝</div>
                <h4>Comunidade Verde</h4>
                <p>Estamos aqui para compartilhar conhecimento,tirar dúvidas para o melhor desenvolvimento da muda.</p>
              </div>
              
            </div>
          </div>
        </section>

        <section className="cta-sobre">
          <h2>Gostou do que viu?</h2>
          <p>Nos dê sua opinião sobre o site e como podemos melhorar sua experiência.</p>
          <button className="cta-button" onClick={openModal}>Fale Conosco</button>

          
        </section>
      </div>

      <Link to="/">
        <button className="botao-inicio-fixo">Início</button>
      </Link>

      <FeedbackModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            recipientEmail="rodriguesjulio635@gmail.com" // Não esqueça de trocar!
          />
    </>
  );
}
