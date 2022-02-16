import styled from '@emotion/styled'
import { CSSObject } from '@emotion/react'

interface IGlobal {
  [key: string]: CSSObject;
}

export const GlobalStyles: IGlobal = {
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  body: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    minHeight: '100vh',
  },
  '#root': {
    minHeight: '100vh',
    gridTemplateRows: 'auto 1fr',
  },
}

export const SMainApp = styled.main({
  fontSize: '0.8rem',
  display: 'grid',
  justifyContent: 'center',
  padding: '3em',
  maxWidth: '100%',

  '@media (min-width: 768px)': {
    fontSize: '1rem',
  },
})
