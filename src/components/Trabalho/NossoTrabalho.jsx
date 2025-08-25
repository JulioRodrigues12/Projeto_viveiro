import { Link } from 'react-router-dom';
import './NossoTrabalho.css';

export function NossoTrabalho() {

  // Coloque isso dentro do seu componente NossoTrabalho, antes do return.
  const projetos = [
    {
      titulo: 'Processo de Criação das Mudas',
      descricao: 'Em nossa empresa prezamos o cuidado na criação das mudas tratando sempre de saber o melhor ambiente e também os melhores produtos para garantir a saude da planta, e também ajudamos nossos clientes no processo de cuidado com sua planta, sempre a disposição para atender suas necessidades.',
        media: [
        { tipo: 'imagem', src: './src/assets/maos-segurando-uma-mudinha-com-terra.jpg', alt: 'Varanda de apartamento exuberante com muitas plantas' },
        { tipo: 'imagem', src: './src/assets/alto-angulo-plantas-pretas-potes.jpg', alt: 'Close-up de uma folha de Costela-de-Adão saudável' }
      ],
      resultado: 'Nosso viveiro ja conta com centenas de mudas de vários tipos e tambêm o apoio de vários clientes e patrocinadores que garantem nossa qualidade.'
    },
    {
      titulo: 'Entregas realizadas e certificação de eficiência',
      descricao: 'Já realizamos diversas entregas por toda Cataguases e região desde projetos menores até grandes proporções sempre buscando garantir a qualidade da entrega e sua eficiência a nossos clientes.',
      media: [
        { tipo: 'imagem', src: './src/assets/plantas-de-interior-em-estudio.jpg', alt: 'Escritório moderno com diversas plantas nos ambientes' },
        { tipo: 'video', src: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', alt: 'Vídeo mostrando o ambiente do escritório com as plantas' } // Exemplo de vídeo
      ],
      resultado: 'Diversos clientes atestam e confirmam nosso comprometimento e qualidade na entrega e nosso pronto atendimento a resolver quaisquer problemas em nossa logística.'
    },
    {
      titulo: 'Conquistas e a importância dos nossos clientes em nossa empresa',
      descricao: 'Com anos no mercado, nossa empresa celebra nossas conquistas mais importântes em nossa jornada, o que não seria possivel sem o apoio de nossos clientes e equipe que nos ajudam a fortalecer nossa marca e bater nossas metas.',
      media: [
        { tipo: 'imagem', src: './src/assets/area-de-refeicoes-ao-ar-livre-com-plantas-e-claraboia.jpg', alt: 'Crianças e adultos plantando mudas na horta comunitária' },
        { tipo: 'imagem', src: './src/assets/maos-segurando-uma-mudinha-com-terra.jpg', alt: 'Moradores sorrindo com a primeira colheita de vegetais frescos' }
      ],
      resultado: 'Em 2 anos nossa empresa alcançou marcas não antes vistas com um aumento de 30% em nossas vendas e conseguindo expandir nosso négocio para abranger mais produtos e outras localidades.'
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
