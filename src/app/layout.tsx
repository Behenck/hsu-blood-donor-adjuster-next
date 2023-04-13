"use client";
import { GlobalStyle } from '@/styles/global'
import { theme } from '@/styles/theme'
import Image from 'next/image';
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components'
import { AdjusterForm, Copyright, Main, Window } from './stylesLayout';
import WomanBloodBankImage from '../assets/image.jpg'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <Main>
            <Toaster />
            <Window>
              <div>
                <Image src={WomanBloodBankImage} alt="image" width={500} height={500} />
              </div>
              <AdjusterForm>
                {children}
              </AdjusterForm>
            </Window>

            <Copyright>
              <p>Copyright © 2023 • Denilson Behenck • Todos os direitos reservados</p>
            </Copyright>
          </Main>
        </ThemeProvider>
      </body>
    </html>
  )
}
