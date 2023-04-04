import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

import { Pencil, PlusCircle } from "@phosphor-icons/react"

import Header from "../../components/Header"
import Title from "../../components/Title"

import { AuthContext } from "../../contexts/auth"

import { DocumentData, DocumentSnapshot, addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

interface CustomersProps {
  id: string,
  company: string
}

const listRef = collection(db, 'customers')

export default function New() {

  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const [customers, setCustomers] = useState<CustomersProps[]>([])
  const [loadCustomer, setLoadCustomer] = useState(true)
  const [customerSelected, setCustomerSelected] = useState(0)

  const [complemento, setComplemento] = useState('')
  const [assunto, setAssunto] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')
  const [idCustomer, setIdCustomer] = useState(false)

  useEffect(() => {
    async function loadCustomers() {
      const querySnap = await getDocs(listRef)
        .then((snapshot) => {
          let lista: CustomersProps[] = []

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              company: doc.data().company
            })
          })

          if (snapshot.docs.length === 0) {
            console.log('Nenhuma empresa encontrada');
            setCustomers([{ id: '1', company: 'FREELANCE' }])
            setLoadCustomer(false)
            return
          }

          setCustomers(lista)
          setLoadCustomer(false)

          if (id) {
            loadId(lista, id)
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar os clientes', error);
          setLoadCustomer(false)
          setCustomers([{ id: '1', company: 'FREELANCE' }])
        })
    }
    loadCustomers()
  }, [id])

  async function loadId(lista: CustomersProps[], id: string) {
    const docRef = doc(db, 'tickets', id)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      setAssunto(snapshot.data().topic)
      setStatus(snapshot.data().status)
      setComplemento(snapshot.data().complement)

      let index = lista.findIndex(item => item.id === snapshot.data().clientId)
      setCustomerSelected(index)
      setIdCustomer(true)
    }
    else {
      setIdCustomer(false)
      console.error('Documento nao encontrado');
    }
  }

  function handleOptionChange(e: ChangeEvent<HTMLInputElement>) {
    setStatus(e.target.value)
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    setAssunto(e.target.value)
  }

  function handleCustomerChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(e.target.value)
    setCustomerSelected(value)
    console.log(customers[value].company);
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (idCustomer && id) {
      const docRef = doc(db, 'tickets', id)
      await updateDoc(docRef, {
        client: customers[customerSelected].company,
        clientId: customers[customerSelected].id,
        topic: assunto,
        complement: complemento,
        status: status,
        userId: user && user.uid
      })
        .then(() => {
          toast.info('Chamado atualizado com sucesso!')
          setCustomerSelected(0)
          setComplemento('')
          navigate('/dashboard')
        })
        .catch((error) => {
          toast.error('Ops... Erro ao atualizar o chamado!')
          console.error(error);
        })

      return
    }

    await addDoc(collection(db, 'tickets'), {
      created: new Date(),
      client: customers[customerSelected].company,
      clientId: customers[customerSelected].id,
      topic: assunto,
      complement: complemento,
      status: status,
      userId: user && user.uid
    })
      .then(() => {
        toast.success('Chamado registrado!')
        setComplemento('')
        setCustomerSelected(0)
      })
      .catch((error) => {
        toast.error('Opss... Erro ao registrar, tente mais tarde.')
        console.error(error);
      })
  }

  return (
    <div>
      <Header />
      <div className='md:ml-52 px-4 py-1'>
        <Title name={id ? "Editando chamado" : "Novo chamado"}>
          {id ? <Pencil size={24} /> : <PlusCircle size={24} />}

        </Title>

        <div className='flex bg-light-color rounded-md p-4 items-center mb-4 shadow-md'>
          <form className='flex flex-col gap-3 w-full' onSubmit={handleRegister}>
            <label className="font-semibold">Clientes</label>
            {
              loadCustomer ? (
                <input type="text" disabled value='Carregando' />
              ) : (
                <select
                  className='w-full h-11 rounded p-3 text-sm max-w-xl outline-none mb-4'
                  value={customerSelected}
                  onChange={handleCustomerChange}
                >
                  {
                    customers.map((item, index) => {
                      return (
                        <option key={index} value={index}>
                          {item.company}
                        </option>
                      )
                    })
                  }
                </select>
              )
            }

            <label className="font-semibold">Assunto</label>
            <select
              className='w-full h-11 rounded p-3 text-sm max-w-xl outline-none mb-4'
              value={assunto}
              onChange={handleSelectChange}
            >
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label className="font-semibold">Status</label>
            <div className="mb-4 flex">

              <input
                id="aberto"
                type="radio"
                name="radio"
                value="Aberto"
                checked={status === 'Aberto'}
                onChange={handleOptionChange}
                className="peer/aberto"
              />
              <label htmlFor="aberto" className='mr-4 pl-2 text-sm hover:cursor-pointer peer-checked/aberto:text-sky-500'>Aberto</label>

              <input
                id="progresso"
                type="radio"
                name="radio"
                value="Em progresso"
                onChange={handleOptionChange}
                checked={status === 'Em progresso'}
                className="peer/progresso"
              />
              <label htmlFor="progresso" className='mr-4 pl-2 text-sm hover:cursor-pointer peer-checked/progresso:text-sky-500'>Em progresso</label>

              <input
                id="concluido"
                type="radio"
                name="radio"
                value="Concluido"
                onChange={handleOptionChange}
                checked={status === 'Concluido'}
                className="peer/concluido"
              />
              <label htmlFor="concluido" className='pl-2 text-sm hover:cursor-pointer peer-checked/concluido:text-sky-500'>Concluído</label>
            </div>

            <label className="font-semibold">Complemento</label>
            <textarea
              typeof="text"
              placeholder="Descreva seu problema/pedido (opcional)."
              className="resize-none h-24 p-3 rounded"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />

            <button
              type="submit"
              className='w-36 h-10 rounded p-3 text-lg text-light-bg bg-dark-blue flex items-center justify-center font-semibold hover:opacity-80 transition-all shadow-md hover:shadow-none'
            >
              {id ? 'Atualizar' : 'Registrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}