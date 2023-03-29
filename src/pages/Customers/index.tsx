import { FormEvent, useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { Users } from "@phosphor-icons/react"
import { toast } from "react-toastify"

import { db } from "../../services/firebaseConnection"

import Header from "../../components/Header"
import Title from "../../components/Title"


type Props = {}

export default function Customers({ }: Props) {

  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [endereco, setEndereco] = useState('')

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (nome !== '' && cnpj !== '' && endereco !== '') {
      await addDoc(collection(db, 'customers'), {
        company: nome,
        cnpj: cnpj,
        address: endereco
      })
        .then(() => {
          setNome('')
          setCnpj('')
          setEndereco('')
          toast.success('Empresa registrada!')
        })
        .catch((error) => {
          console.error(error);
          toast.error('Erro ao realizar o cadastro.')
        })
    } else {
      toast.error('Preencha todos os campos.')
    }
  }

  return (
    <div>
      <Header />

      <div className='md:ml-52 px-4 py-1'>
        <Title name="Clientes">
          <Users size={24} />
        </Title>

        <div className='flex bg-light-color rounded-md p-4 items-center mb-4 shadow-md'>
          <form
            className='flex flex-col gap-3 w-full'
            onSubmit={handleRegister}
          >
            <label> Nome da empresa</label>
            <input
              type="text"
              placeholder="Nome da empresa/cliente"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className='w-full h-10 rounded p-3 text-sm max-w-xl outline-none mb-4'
            />

            <label>CNPJ</label>
            <input
              type="text"
              placeholder="CNPJ ou CPF"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              className='w-full h-10 rounded p-3 text-sm max-w-xl outline-none mb-4'
            />

            <label>Endereço</label>
            <input
              type="text"
              placeholder="Endereço da empresa/cliente"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className='w-full h-10 rounded p-3 text-sm max-w-xl outline-none mb-4'
            />

            <button
              type='submit'
              className='w-36 h-10 rounded p-3 text-lg text-light-bg bg-dark-blue flex items-center justify-center font-semibold hover:opacity-80 transition-all shadow-md hover:shadow-none'
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}