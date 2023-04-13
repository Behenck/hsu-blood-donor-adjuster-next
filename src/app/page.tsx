"use client";
import { Loading } from "@/components/Loading";
import { Button, Form, FormControl, Input } from "./stylesHome";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "react-hot-toast"
import { useState } from "react"
import { api } from "@/services/api";

interface Donor {
  doador: string
  registro: string
  sexo: "M" | "F"
}

const UpdateBloodDonorFormSchema = z.object({
  donor: z.string().min(9).max(9),
})

type UpdateBloodDonorFormInputs = z.infer<typeof UpdateBloodDonorFormSchema>

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [donor, setDonor] = useState<Donor>({} as Donor)
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<UpdateBloodDonorFormInputs>({
    resolver: zodResolver(UpdateBloodDonorFormSchema),
  })

  async function handleUpdateBloodDonor(data: UpdateBloodDonorFormInputs) {
    const { donor: register } = data

    try {
      await api.post('/updateBloodDonor', {
        genre: donor.sexo,
        donor: register,
      })
     
      reset()
      setDonor({
        doador: "",
        registro: "",
        sexo: "M"
      })
      toast.success("Dados atualizados com sucesso!")

    } catch (err) {
      console.log(err)
      toast.error("Não foi possível atualizar!")
    }
  }

  async function handleFindByDonor(value: string) {
    setIsLoading(true)
    const res = await api.post('/findByDonor', {
      donor: value,
    })
    
    !res.data[0] ? setDonor({
      doador: "Não Encontrado",
      registro: "0",
      sexo: "M",
    }) : setDonor(res.data[0])

    setIsLoading(false)
  }

  const disabledButton = donor.registro === "0" || isLoading === true

  return (
    <Form onSubmit={handleSubmit(handleUpdateBloodDonor)}>
      <FormControl>
        <label htmlFor="donor">Doador</label>
        <Input id="donor" type="text" {...register("donor")} onBlur={(e) => handleFindByDonor(e.target.value)} />
      </FormControl>

      <FormControl>
        <label htmlFor="name">Nome</label>
        <Input type="text" disabled value={donor.doador ? donor.doador : ''} />
      </FormControl>

      <Button type="submit" disabled={disabledButton}>
        {isLoading ? <Loading /> : "Salvar"}
      </Button>
    </Form>
  )
}
