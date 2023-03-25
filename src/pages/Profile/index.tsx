import React from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { Gear } from '@phosphor-icons/react'

type Props = {}

export default function Profile({ }: Props) {
  return (
    <div>
      <Header />
      <div className='ml-52 px-4 py-1'>
        <Title name='Configurações'>
          <Gear size={24} />
        </Title>
      </div>
    </div>
  )
}