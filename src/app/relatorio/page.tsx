"use client"
import { Button, Form, FormControl, Select } from "./styles";
import { toast } from "react-hot-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import fileDownload from "js-file-download"
import axios from "axios"
import { useState } from "react"
import { Loading } from "@/components/Loading"

const GenerateReportFormSchema = z.object({
  report: z.string(),
  year: z.string(),
  month: z.string(),
})

type GenerateReportFormInputs = z.infer<typeof GenerateReportFormSchema>

export default function Report() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<GenerateReportFormInputs>({
    resolver: zodResolver(GenerateReportFormSchema),
  })

  async function handleGenerateReport(data: GenerateReportFormInputs) {
    setIsLoading(true)
    const { report, year, month } = data
    let filename = "bancoDeSangue.xlsx"
    try {
      await axios({
        url: report === '01' ? "/api/findByMonthToDonor" : report === '02' ? "/api/findByLastSixMonth?fatorRh=N" : "/api/findByLastSixMonth?fatorRh=P",
        method: "POST",
        responseType: 'blob',
        data: {
          year,
          month,
        },
      }).then((response) => {
        var disposition = response.headers['content-disposition'];
        if (disposition && disposition.indexOf('attachment') !== -1) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) { 
            filename = matches[1].replace(/['"]/g, '');
          }
      }     
        setIsLoading(false)
        reset()
        fileDownload(response.data, filename)
      })
    } catch (err) {
      setIsLoading(false)
      console.log(err)
      toast.error("Não foi possível gerar o relatório!")
    }
  }
  const date = new Date()

  const optionsReport = [
    { value: '00', text: '-- Selecione --' },
    { value: '01', text: 'Mensal' },
    { value: '02', text: 'últimos 6 meses (O-, A-, B-)' },
    { value: '03', text: 'últimos 6 meses (O+, A+, B+)' },
  ]
  const optionsMonth = [
    { value: '00', text: '-- Selecione --' },
    { value: '01', text: 'Janeiro' },
    { value: '02', text: 'Fevereiro' },
    { value: '03', text: 'Março' },
    { value: '04', text: 'Abril' },
    { value: '05', text: 'Maio' },
    { value: '06', text: 'Junho' },
    { value: '07', text: 'Julho' },
    { value: '08', text: 'Agosto' },
    { value: '09', text: 'Setembro' },
    { value: '10', text: 'Outubro' },
    { value: '11', text: 'Novembro' },
    { value: '12', text: 'Dezembro' },
  ]
  const optionsYear = [
    { value: `${date.getFullYear()}`, text: `${date.getFullYear()}` },
    { value: `${date.getFullYear() -1}`, text: `${date.getFullYear() -1}` },
  ]

  return (
    <Form onSubmit={handleSubmit(handleGenerateReport)}>
      <FormControl>
        <label htmlFor="report">Relatório</label>
        <Select id="report" {...register("report")}>
          {optionsReport.map(option => (
            <option key={option.value} disabled={option.value === '00' && true} selected={option.value === '00' && true} value={option.value}>
              {option.text}
            </option>
            ))}
        </Select>
      </FormControl>

      <FormControl>
        <label htmlFor="month">Mês</label>
        <Select id="month" {...register("month")} disabled={watch('report') !== '01'}>
          {optionsMonth.map(option => (
            <option key={option.value} disabled={option.value === '00' && true} selected={option.value === '00' && true} value={option.value}>
              {option.text}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <label htmlFor="year">Ano</label>
        <Select id="year" {...register("year")} disabled={watch('report') !== '01'}>
          {optionsYear.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
        </Select>
      </FormControl>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Loading /> : "Gerar"}
      </Button>
    </Form>
    )
}
