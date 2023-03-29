import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Gear, UploadSimple } from '@phosphor-icons/react'
import { doc, updateDoc } from 'firebase/firestore'

import { AuthContext } from '../../contexts/auth'
import { auth, db, storage } from '../../services/firebaseConnection'

import avatar from '../../assets/avatar.png'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default function Profile() {

  const { user, setUser, storageUser, logOut } = useContext(AuthContext)

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  const [imageAvatar, setImageAvatar] = useState<File | null>(null)
  const [name, setName] = useState(user!.name)
  const [email, setEmail] = useState(user!.email)

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]

      if (['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(image.type)) {
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(image))
      } else {
        alert('Envie uma imagem dos tipos PNG, JPG, JPEG ou GIF')
        setImageAvatar(null)
        return
      }
    }
  }

  async function handleUpload() {
    if (user && imageAvatar) {
      const currentUid = user.uid

      const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

      const uploadTask = uploadBytes(uploadRef, imageAvatar)
        .then((snapshot) => {

          getDownloadURL(snapshot.ref).then(async (downloadURL) => {
            let urlFoto = downloadURL

            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
              avatarUrl: urlFoto,
              name: name
            })
              .then(() => {
                let data = {
                  ...user,
                  name: name,
                  avatarUrl: urlFoto
                }

                setUser(data)
                storageUser(data)
                toast.success('Atualizado com sucesso!')
              })
          })
        })

    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (imageAvatar === null && name !== '') {
      if (user) {
        const docRef = doc(db, 'users', user.uid)

        await updateDoc(docRef, {
          name: name,
        })
          .then(() => {
            let data = {
              ...user,
              name: name,
            }

            setUser(data)
            storageUser(data)
            toast.success('Atualizado com sucesso!')
          })
      }
    } else if (name !== '' && imageAvatar !== null) {
      handleUpload()
    }
  }

  return (
    <div>

      <Header />

      <div className='md:ml-52 px-4 py-1'>

        <Title name='Configurações'>
          <Gear size={24} />
        </Title>

        <div className='flex bg-light-color rounded-md p-4 items-center mb-4 shadow-md'>
          <form className='w-full' onSubmit={handleSubmit}>
            <label className='group w-72 h-72 flex justify-center items-center flex-col cursor-pointer'>
              <span className='z-10 absolute opacity-60 transition-all group-hover:opacity-100 group-hover:scale-125 group-hover:drop-shadow-md'>
                <UploadSimple
                  size={30}
                  color='#fff'
                />
              </span>
              <input
                type="file"
                accept='image/*'
                className='hidden'
                onChange={handleFile}
              />
              <img
                src={avatarUrl ? avatarUrl : avatar}
                alt='foto de perfil'
                className='w-64 h-64 rounded-full object-cover mb-4'
              />
            </label>
            <div className='flex flex-col gap-3 w-full'>
              <span className=''>Nome</span>
              <input
                type="text"
                value={name ? name : ''}
                onChange={(e) => setName(e.target.value)}
                className='w-full h-10 rounded p-3 text-sm max-w-xl outline-none mb-4'
              />
            </div>

            <div className='flex flex-col gap-3 w-full'>
              <span className=''>E-mail</span>
              <input
                type="text"
                value={email ? email : ''}
                disabled
                className='cursor-not-allowed w-full max-w-xl h-10 rounded p-3 text-sm mb-4'
              />
            </div>

            <button
              type='submit'
              className='w-36 h-10 rounded p-3 text-lg text-light-bg bg-dark-blue flex items-center justify-center font-semibold hover:opacity-80 transition-all shadow-md hover:shadow-none'
            >
              Salvar
            </button>
          </form>
        </div>

        <div className='flex bg-light-color rounded-md p-4 items-center mb-4 shadow-md'>
          <button
            className='w-36 h-10 rounded p-3 text-lg text-dark-blue bg-transparent border border-dark-blue flex items-center justify-center font-semibold hover:bg-dark-blue hover:text-light-color transition-all shadow-md hover:shadow-none'
            onClick={() => logOut(auth)}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}