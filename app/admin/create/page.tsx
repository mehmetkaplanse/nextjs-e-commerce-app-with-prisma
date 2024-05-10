import { getCurrentUser } from '@/app/actions/getCurrentUser'
import WarningText from '@/app/components/WarningText'
import CreateForm from '@/app/components/admin/CreateForm'
import AuthContainer from '@/app/components/containers/AuthContainer'
import React from 'react'

const CreateProduct = async () => {
  const currentUser = await getCurrentUser()

  if(!currentUser || currentUser.role !== "ADMIN") {
    return (
      <WarningText text='Buraya İzniniz Yoktur!'/>
    )
  }
  return (
    <div className='min-h-fit w-full mt-4 flex items-center justify-center'>
      <CreateForm />
    </div>
  )
}

export default CreateProduct