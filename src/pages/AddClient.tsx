import React from 'react'
import ClientForms from '../components/ClientForms.tsx'

const AddClient = () => {
  return (
    <>
        <div className="card w-75 m-auto mt-4">
          <div className="card-body">
            <ClientForms isEdit={false} clientInfo={{}} />
          </div>
        </div>
    </>
  )
}

export default AddClient
