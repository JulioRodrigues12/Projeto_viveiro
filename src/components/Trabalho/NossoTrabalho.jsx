import { Link } from 'react-router-dom';
import './NossoTrabalho.css';

export function NossoTrabalho() {

  // Coloque isso dentro do seu componente NossoTrabalho, antes do return.
  const projetos = [
    {
      titulo: 'Processo de Criação das Mudas',
      descricao: 'Em nossa empresa prezamos o cuidado na criação das mudas  tratando sempre de saber o melhor ambiente e também os melhores produtos para garantir a saude da planta, e também ajudamos nossos clientes no processo de cuidado com sua planta, sempre a disposição para atender suas necessidades.',
        media: [
        { tipo: 'imagem', src: './src/assets/criacao-de-mudas1.jpeg', alt: 'Processo de cuidado das mudas' },
        { tipo: 'imagem', src: './src/assets/criacao-de-mudas2.jpeg', alt: 'Processo de criação de mudas' },
        { tipo: 'imagem', src: './src/assets/criacao-de-mudas3.jpeg', alt: 'Processo de criação de mudas' },
        { tipo: 'imagem', src: './src/assets/criacao-de-mudas5.jpeg', alt: 'Processo de criação de mudas' }
      ],
      resultado: 'Nosso viveiro ja conta com centenas de mudas de vários tipos .'
    },
    {
      titulo: 'Entregas realizadas e certificação de eficiência',
      descricao: 'Já realizamos diversas entregas por toda Cataguases e região desde projetos menores até grandes proporções sempre buscando garantir a qualidade da entrega e sua eficiência a nossos clientes.',
      media: [
        { tipo: 'imagem', src: './src/assets/entrega-de-mudas3.jpeg', alt: 'Mudas entregues' },
        { tipo: 'video', src: 'https://www.youtube.com/embed/QcsT3qddr8Q', alt: 'Vídeo mostrando nossas modas e uma entrega sendo feita' },
        { tipo: 'imagem', src: './src/assets/criacao-de-mudas4.jpeg', alt: 'Processo de criação de mudas' },
        { tipo: 'imagem', src: './src/assets/entrega-de-mudas1.jpeg', alt: 'Mudas entregues' },
      ],
      resultado: 'Diversos clientes atestam e confirmam nosso comprometimento e qualidade na entrega e nosso pronto atendimento a resolver quaisquer problemas em nossa logística.'
    },
    {
      titulo: 'Modernizando nosso empreendimento',
      descricao: 'Estamos modernizando nosso empreendimento de mudas para oferecer a você mais praticidade, qualidade e confiança. Agora, além do cultivo sustentável, contamos com um site moderno para facilitar sua experiência na hora de conhecer e adquirir nossas mudas.".',
      media: [
        { tipo: 'imagem', src: './src/assets/code-site.jpeg', alt: 'Código do site ' },
        { tipo: 'imagem', src: './src/assets/mao-com-celular.jpeg', alt: 'Site no celular' },
        { tipo: 'imagem', src: './src/assets/viveiro-tec.jpg', alt: 'Tecnologia no Viveiro' },
        { tipo: 'imagem', src: './src/assets/tela-com-site.jpeg', alt: 'Site no PC' }
      ],
      resultado: 'Em 2 anos nossa empresa alcançou marcas não antes vistas com um aumento de 30% em nossas vendas. Por isso estamos deixando tudo mais moderno com o lançamento do noss site , para facilitar seu contato conosco'
    }
  ];
  return (
    <>
      <div className="pagina-trabalho">
        <header className="cabecalho-trabalho">
          <h1 className="titulo">Nosso Portfólio</h1>
          <p className="subtitulo-pagina">
            Aqui estão alguns dos projetos que nos enchem de orgulho. Cada um representa um desafio único e uma parceria de sucesso.
          </p>
        </header>

        <div className="portfolio-container">
          {projetos.map((projeto, index) => (
            <article key={index} className="card-projeto">
              <div className="conteudo-projeto">
                <h2 className="titulo-projeto">{projeto.titulo}</h2>
                <p className="descricao-projeto">{projeto.descricao}</p>
                
                <div className="resultado-projeto">
                  <span className="icone-resultado">🏆</span>
                  <p>{projeto.resultado}</p>
                </div>
              </div>

              <div className="media-galeria">
                {projeto.media.map((item, idx) => (
                  <div key={idx} className="media-item">
                    {item.tipo === 'video' ? (
                      <iframe
                        src={item.src}
                        title={projeto.titulo}
                        allowFullScreen
                      />
                    ) : (
                      <img src={item.src} alt={item.alt} />
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <Link to="/">
        <button className="botao-inicio-fixo">Início</button>
      </Link>
    </>
  );
}
