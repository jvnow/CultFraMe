import {
  useEffect,
  useState,
} from 'react'
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import Header from '../components/Header'
import { obras } from '../data/obras'

type StatusBiblioteca =
  | 'quero'
  | 'vendo'
  | 'concluido'

interface ItemBiblioteca {
  obraId: number
  status: StatusBiblioteca
}

interface AvaliacaoObra {
  obraId: number
  nota: number
}

interface DadosAvaliacoes {
  versao: 1
  avaliacoes: AvaliacaoObra[]
}

const CHAVE_BIBLIOTECA =
  'cultframe-biblioteca'

const CHAVE_AVALIACOES =
  'cultframe-avaliacoes'

function notaValida(nota: number) {
  return (
    nota >= 0.5 &&
    nota <= 5 &&
    Number.isInteger(nota * 2)
  )
}

function Obra() {
  const { id } = useParams()
  const navigate = useNavigate()

  const obra = obras.find(
    (item) => item.id === Number(id)
  )

  const [mostrarStatus, setMostrarStatus] =
    useState(false)

  const [
    mensagemBiblioteca,
    setMensagemBiblioteca,
  ] = useState('')

  const [notaSalva, setNotaSalva] =
    useState<number | null>(null)

  const [
    notaSelecionada,
    setNotaSelecionada,
  ] = useState<number | null>(null)

  const [notaPrevia, setNotaPrevia] =
    useState<number | null>(null)

  const [avaliando, setAvaliando] =
    useState(false)

  const [
    mensagemAvaliacao,
    setMensagemAvaliacao,
  ] = useState('')

  /*
   * Carrega a avaliação salva somente quando
   * a página da obra é aberta.
   */
  useEffect(() => {
    if (!obra) {
      return
    }

    const avaliacoesSalvas =
      localStorage.getItem(
        CHAVE_AVALIACOES
      )

    if (!avaliacoesSalvas) {
      return
    }

    try {
      const dados =
        JSON.parse(
          avaliacoesSalvas
        ) as DadosAvaliacoes

      if (
        dados.versao !== 1 ||
        !Array.isArray(dados.avaliacoes)
      ) {
        return
      }

      const avaliacoesValidas =
        dados.avaliacoes.filter(
          (item) =>
            Number.isInteger(
              item.obraId
            ) &&
            item.obraId > 0 &&
            notaValida(item.nota)
        )

      const avaliacao =
        avaliacoesValidas.find(
          (item) =>
            item.obraId === obra.id
        )

      if (avaliacao) {
        setNotaSalva(avaliacao.nota)
      }
    } catch {
      localStorage.removeItem(
        CHAVE_AVALIACOES
      )
    }
  }, [obra])

  /*
   * Proteção ao fechar ou recarregar a página
   * enquanto existe uma avaliação pendente.
   *
   * O navegador controla a mensagem exibida
   * nesse tipo de confirmação.
   */
  useEffect(() => {
    function lidarComAntesDeSair(
      event: BeforeUnloadEvent
    ) {
      if (
        avaliando &&
        notaSelecionada !== null
      ) {
        event.preventDefault()
        event.returnValue = ''
      }
    }

    window.addEventListener(
      'beforeunload',
      lidarComAntesDeSair
    )

    return () => {
      window.removeEventListener(
        'beforeunload',
        lidarComAntesDeSair
      )
    }
  }, [
    avaliando,
    notaSelecionada,
  ])

  /*
   * Biblioteca
   */
  function adicionarBiblioteca(
    status: StatusBiblioteca
  ) {
    if (!obra) {
      return
    }

    const bibliotecaSalva =
      localStorage.getItem(
        CHAVE_BIBLIOTECA
      )

    let biblioteca: ItemBiblioteca[] =
      []

    if (bibliotecaSalva) {
      try {
        const dados =
          JSON.parse(
            bibliotecaSalva
          )

        if (Array.isArray(dados)) {
          biblioteca =
            dados.filter(
              (item): item is ItemBiblioteca =>
                Number.isInteger(
                  item?.obraId
                ) &&
                item.obraId > 0 &&
                (
                  item.status ===
                    'quero' ||
                  item.status ===
                    'vendo' ||
                  item.status ===
                    'concluido'
                )
            )
        }
      } catch {
        biblioteca = []
      }
    }

    const indiceExistente =
      biblioteca.findIndex(
        (item) =>
          item.obraId === obra.id
      )

    if (indiceExistente >= 0) {
      biblioteca[indiceExistente] = {
        obraId: obra.id,
        status,
      }
    } else {
      biblioteca.push({
        obraId: obra.id,
        status,
      })
    }

    localStorage.setItem(
      CHAVE_BIBLIOTECA,
      JSON.stringify(biblioteca)
    )

    setMostrarStatus(false)

    setMensagemBiblioteca(
      'Obra adicionada à biblioteca!'
    )

    setTimeout(() => {
      setMensagemBiblioteca('')
    }, 2500)
  }

  /*
   * Avaliação
   */
  function iniciarAvaliacao() {
    setNotaSelecionada(notaSalva)
    setNotaPrevia(null)
    setMensagemAvaliacao('')
    setAvaliando(true)
  }

  function cancelarAvaliacao() {
    setNotaSelecionada(notaSalva)
    setNotaPrevia(null)
    setAvaliando(false)
    setMensagemAvaliacao('')
  }

  function selecionarNota(
    nota: number
  ) {
    if (!notaValida(nota)) {
      return
    }

    setNotaSelecionada(nota)
    setNotaPrevia(null)
  }

  function salvarAvaliacao() {
    if (
      !obra ||
      notaSelecionada === null ||
      !notaValida(notaSelecionada)
    ) {
      return
    }

    let dados: DadosAvaliacoes = {
      versao: 1,
      avaliacoes: [],
    }

    const avaliacoesSalvas =
      localStorage.getItem(
        CHAVE_AVALIACOES
      )

    if (avaliacoesSalvas) {
      try {
        const dadosExistentes =
          JSON.parse(
            avaliacoesSalvas
          ) as DadosAvaliacoes

        if (
          dadosExistentes.versao === 1 &&
          Array.isArray(
            dadosExistentes.avaliacoes
          )
        ) {
          dados.avaliacoes =
            dadosExistentes.avaliacoes.filter(
              (item) =>
                Number.isInteger(
                  item.obraId
                ) &&
                item.obraId > 0 &&
                notaValida(item.nota)
            )
        }
      } catch {
        dados = {
          versao: 1,
          avaliacoes: [],
        }
      }
    }

    /*
     * Nunca cria uma segunda avaliação
     * para a mesma obra.
     */
    const indiceExistente =
      dados.avaliacoes.findIndex(
        (item) =>
          item.obraId === obra.id
      )

    const novaAvaliacao: AvaliacaoObra = {
      obraId: obra.id,
      nota: notaSelecionada,
    }

    if (indiceExistente >= 0) {
      dados.avaliacoes[
        indiceExistente
      ] = novaAvaliacao
    } else {
      dados.avaliacoes.push(
        novaAvaliacao
      )
    }

    localStorage.setItem(
      CHAVE_AVALIACOES,
      JSON.stringify(dados)
    )

    setNotaSalva(notaSelecionada)
    setNotaSelecionada(notaSelecionada)
    setNotaPrevia(null)
    setAvaliando(false)

    setMensagemAvaliacao(
      'Avaliação salva'
    )

    setTimeout(() => {
      setMensagemAvaliacao('')
    }, 2500)
  }

  /*
   * Navegação interna.
   *
   * O aviso só aparece quando:
   * - o usuário está avaliando;
   * - existe uma nota selecionada.
   */
  function navegarComConfirmacao(
    destino: string
  ) {
    if (
      avaliando &&
      notaSelecionada !== null
    ) {
      const sair =
        window.confirm(
          'Você ainda não terminou sua avaliação.\n\nSua nota não foi salva. Deseja sair mesmo?'
        )

      if (!sair) {
        return
      }
    }

    navigate(destino)
  }

  function obterNotaExibida() {
    if (notaPrevia !== null) {
      return notaPrevia
    }

    if (notaSelecionada !== null) {
      return notaSelecionada
    }

    if (notaSalva !== null) {
      return notaSalva
    }

    return 0
  }

  function obterTextoNota() {
    const nota =
      obterNotaExibida()

    if (nota === 0) {
      return 'Nenhuma avaliação'
    }

    return `${nota
      .toString()
      .replace('.', ',')} / 5`
  }

  function obterSimboloEstrela(
    numeroEstrela: number
  ) {
    const nota =
      obterNotaExibida()

    if (nota >= numeroEstrela) {
      return '★'
    }

    if (
      nota >=
      numeroEstrela - 0.5
    ) {
      return '◐'
    }

    return '☆'
  }

  if (!obra) {
    return (
      <main className="obra-page">
        <Header />

        <div
          className="obra-nao-encontrada"
          role="status"
        >
          <h1>Obra não encontrada</h1>

          <p>
            Não encontramos a obra que
            você está procurando.
          </p>

          <Link to="/catalogo">
            Voltar para o catálogo
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="obra-page">
      <Header />

      <div className="obra-container">
        <button
          type="button"
          className="obra-voltar"
          onClick={() =>
            navegarComConfirmacao(
              '/catalogo'
            )
          }
        >
          ← Voltar para o catálogo
        </button>

        <div className="obra-detalhes">
          <div className="obra-detalhes-imagem">
            <img
              src={obra.imagem}
              alt={`Capa de ${obra.titulo}`}
            />
          </div>

          <div className="obra-detalhes-info">
            <span className="obra-detalhes-tipo">
              {obra.tipo === 'Serie'
                ? 'Série'
                : obra.tipo === 'Manga'
                  ? 'Mangá / HQ'
                  : obra.tipo ===
                      'Musica'
                    ? 'Música'
                    : obra.tipo}
            </span>

            <h1>{obra.titulo}</h1>

            <div
              className="obra-detalhes-nota"
              aria-label={`Nota ${obra.nota} de 5`}
            >
              <span aria-hidden="true">
                ★
              </span>

              <strong>
                {obra.nota}
              </strong>

              <small>/ 5</small>
            </div>

            <p className="obra-detalhes-descricao">
              Descubra, avalie e compartilhe
              sua experiência com esta obra
              no CultFraMe.
            </p>

            {!avaliando && (
              <>
                <div className="obra-detalhes-acoes">
                  <button
                    type="button"
                    aria-expanded={
                      mostrarStatus
                    }
                    aria-controls="obra-status-menu"
                    onClick={() =>
                      setMostrarStatus(
                        !mostrarStatus
                      )
                    }
                  >
                    + Adicionar à biblioteca
                  </button>

                  <button
                    type="button"
                    onClick={
                      iniciarAvaliacao
                    }
                  >
                    {notaSalva !== null
                      ? 'Editar avaliação'
                      : '★ Avaliar'}
                  </button>
                </div>

                {mostrarStatus && (
                  <div
                    id="obra-status-menu"
                    className="obra-status-menu"
                    aria-label="Escolher status da biblioteca"
                  >
                    <span>
                      Adicionar como:
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        adicionarBiblioteca(
                          'quero'
                        )
                      }
                    >
                      Quero ver
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        adicionarBiblioteca(
                          'vendo'
                        )
                      }
                    >
                      Vendo
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        adicionarBiblioteca(
                          'concluido'
                        )
                      }
                    >
                      Concluído
                    </button>
                  </div>
                )}
              </>
            )}

            {avaliando && (
              <div
                className="obra-avaliacao"
                aria-label="Avaliar esta obra"
              >
                <h2>
                  {notaSalva !== null
                    ? 'Editar avaliação'
                    : 'Sua avaliação'}
                </h2>

                <div
                  className="avaliacao-estrelas"
                  onMouseLeave={() =>
                    setNotaPrevia(null)
                  }
                >
                  {Array.from(
                    { length: 5 },
                    (_, indice) => {
                      const numeroEstrela =
                        indice + 1

                      return (
                        <div
                          className="avaliacao-estrela-wrapper"
                          key={
                            numeroEstrela
                          }
                        >
                          <button
                            type="button"
                            className="avaliacao-area avaliacao-esquerda"
                            aria-label={`Selecionar ${numeroEstrela - 0.5} estrelas`}
                            onMouseEnter={() =>
                              setNotaPrevia(
                                numeroEstrela -
                                  0.5
                              )
                            }
                            onClick={() =>
                              selecionarNota(
                                numeroEstrela -
                                  0.5
                              )
                            }
                          >
                            <span>
                              {obterSimboloEstrela(
                                numeroEstrela
                              )}
                            </span>
                          </button>

                          <button
                            type="button"
                            className="avaliacao-area avaliacao-direita"
                            aria-label={`Selecionar ${numeroEstrela} estrelas`}
                            onMouseEnter={() =>
                              setNotaPrevia(
                                numeroEstrela
                              )
                            }
                            onClick={() =>
                              selecionarNota(
                                numeroEstrela
                              )
                            }
                          >
                            <span>
                              {obterSimboloEstrela(
                                numeroEstrela
                              )}
                            </span>
                          </button>
                        </div>
                      )
                    }
                  )}
                </div>

                <div
                  className="avaliacao-resultado"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div className="avaliacao-estrelas-exibicao">
                    {Array.from(
                      { length: 5 },
                      (_, indice) => {
                        const numero =
                          indice + 1

                        const simbolo =
                          obterSimboloEstrela(
                            numero
                          )

                        return (
                          <span
                            key={numero}
                            className={
                              simbolo ===
                              '☆'
                                ? 'avaliacao-estrela vazia'
                                : simbolo ===
                                    '◐'
                                  ? 'avaliacao-estrela metade'
                                  : 'avaliacao-estrela cheia'
                            }
                            aria-hidden="true"
                          >
                            {simbolo}
                          </span>
                        )
                      }
                    )}
                  </div>

                  <strong>
                    {obterTextoNota()}
                  </strong>
                </div>

                <div className="obra-avaliacao-acoes">
                  <button
                    type="button"
                    disabled={
                      notaSelecionada ===
                      null
                    }
                    onClick={
                      salvarAvaliacao
                    }
                  >
                    {notaSalva !== null
                      ? 'Salvar alteração'
                      : 'Confirmar avaliação'}
                  </button>

                  <button
                    type="button"
                    onClick={
                      cancelarAvaliacao
                    }
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {mensagemBiblioteca && (
              <p
                className="obra-mensagem"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                ✓ {mensagemBiblioteca}
              </p>
            )}

            {mensagemAvaliacao && (
              <p
                className="obra-mensagem"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                ✓ {mensagemAvaliacao}
              </p>
            )}

            <section className="obra-onde-encontrar">
              <h2>Onde encontrar</h2>

              <p>
                Encontre esta obra nas
                plataformas disponíveis.
              </p>

              <div className="obra-plataformas">
                <span>
                  Links das plataformas
                  serão adicionados aqui.
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Obra
