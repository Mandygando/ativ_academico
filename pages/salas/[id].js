import Pagina from '@/components/Pagina'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import axios from 'axios'

const id = () => {

    const { push, query } = useRouter()
    const { register, handleSubmit, setValue } = useForm();
  
    useEffect(()=>{
      if(query.id) { 
      const salas = JSON.parse(window.localStorage.getItem('salas'))
      const curso = salas[query.id]
      for(let campo in curso) {
          setValue(campo, curso[campo])
      }
  }
    },[query.id])
  
    function salvar(dados) {
      const salas = JSON.parse(window.localStorage.getItem('salas')) || []
      salas.splice(query.id, 1, dados)
      window.localStorage.setItem('salas', JSON.stringify(salas))
      push("/salas")
    }

    return (
        <Pagina titulo="salas">
            <Form>
                <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>Nome: </Form.Label>
                    <Form.Control type="text" {...register('nome')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="capacidade">
                    <Form.Label>Capacidade: </Form.Label>
                    <Form.Control type="text" {...register('capacidade')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tipo">
                    <Form.Label>Tipo: </Form.Label>
                    <Form.Control type="text" {...register('tipo')} />
                </Form.Group>

                

                <div className='text-center'>
                    <Button variant="success" onClick={handleSubmit(salvar)}>
                        <BsCheckLg className="me-2" />
                        Salvar
                    </Button>
                    <Link className="ms-2 btn btn-danger" href="/salas">
                        <AiOutlineArrowLeft className="me-2" />
                        Voltar
                    </Link>
                </div>
            </Form>
        </Pagina>
    )
}

export default id