import styled from 'styled-components'

export const Main = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  
  background-color: #abd3d6;
`

export const Window = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 980px;
  border-radius: 1rem;
  background-color: #f3f4f6;

  div {
    img {
      object-fit: "cover";
      width: 100%;
      height: 100%;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
    }
  }

  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`

export const AdjusterForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 3.5rem 4rem;
  gap: 4.5rem;

  h1 {
    color: #374151;
  }
`
export const Copyright = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 1rem;

  p {
    font-size: 0.75rem;
    color: #374151;
  }
`