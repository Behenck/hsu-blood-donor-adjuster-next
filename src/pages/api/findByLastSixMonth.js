import { Prisma } from '@prisma/client'
import { prisma } from "../../../prisma";
import xl from "excel4node"

export default async function handler(request, response) {
  const {fatorRh} = request.query

  const responseSqlToHemoloc = await prisma.$queryRaw(
    Prisma.sql`SELECT
    CONVERT (VARCHAR, a.dtatend, 103) AS 'Data de atendimento',
    doador.doador AS 'Nome doador',
    doador.grupoabo AS 'Grupo sanguíneo',
    doador.fatorrh AS 'Fator RH',
    doador.numident AS 'Identidade',
    doador.cartaosus AS 'Cartão Saúde',
    doador.endereco AS 'Endereço',
    doador.bairro AS 'Bairro',
    doador.celular AS 'Celular',
    doador.fone AS 'Telefone'
    FROM 
      atendim a,
      doador
    where 
      a.doador	=	doador.registro
      and a.dtatend BETWEEN ${new Date('2022-08-12')} AND ${new Date('2023-02-17')}
      and doador.fatorrh = ${fatorRh}
      and doador.grupoabo IN ('O','A','B')
      ORDER BY a.dtatend,doador.doador DESC`
    )

  const wb = new xl.Workbook()
  
  const ws = wb.addWorksheet('ultimos 6meses')

  const titulos = [
    'Data de atendimento',
    'Nome doador',
    'Grupo sanguíneo',
    'Fator RH',
    'Identidade',
    'Cartão Saúde',
    'Endereço',
    'Bairro',
    'Celular',
    'Telefone'
  ]

  let headingColumnIndex = 1
  titulos.forEach(titulo => {
    ws.cell(1, headingColumnIndex++).string(titulo)
  })

  let rowIndex = 2;
  responseSqlToHemoloc.forEach((record) => {
    let columnIndex = 1;
    Object.keys(record).forEach(columnName => {
      ws.cell(rowIndex, columnIndex++).string(record[columnName])
    })
    rowIndex++;
  })

  wb.write(`relatorio-banco-de-sangue-ultimos-6meses.xlsx`, response)  
}