import { X } from "@phosphor-icons/react"

interface queryTicketProps {
  created: string,
  createdFormat: string,
  client: string,
  clientId: string,
  topic: string,
  complement: string | null,
  status: string,
  id: string,
}

interface ModalProps {
  content: queryTicketProps,
  close: () => void
}

export default function Modal({ content, close }: ModalProps) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-dark-transp z-10">
      <div className="flex relative max-w-xl w-full mt-[15%] bg-light-bg rounded mx-auto py-16 px-8 shadow-lg">
        <button
          onClick={close}
          className="bg-red-500 rounded absolute top-4 right-4 flex justify-center items-center py-2 px-3 text-white gap-1 hover:bg-red-400 transition duration-300"
          title="Fechar"
        >
          <X size={24} color="#fff" />
        </button>

        <main>
          <h2 className="mb-5 text-2xl font-bold">Detalhes do chamado</h2>
          <div className="mb-4">
            <span className="font-bold text-base">Cliente: <i className="font-normal mr-4">{content.client}</i></span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">Assunto: <i className="font-normal mr-4">{content.topic}</i></span>
            <span className="font-bold text-base">Cadastrado em: <i className="font-normal mr-4">{content.createdFormat}</i></span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">Status: <span className={`py-1 px-2 rounded text-white text-sm font-normal mr-4 ${content.status === 'Aberto' ? 'bg-green-600' : 'bg-gray-400'}`}>{content.status}</span></span>
          </div>

          {content.complement !== '' && (
            <>
              <h3 className="font-bold text-base">Complemento</h3>
              <p className="pt-2 whitespace-pre-wrap text-base">{content.complement}</p>
            </>
          )}

        </main>
      </div>
    </div>
  )
}