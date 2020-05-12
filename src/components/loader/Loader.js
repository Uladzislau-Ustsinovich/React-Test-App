import React from 'react'
import { LoaderSpinner, LoaderWrapper } from './loader.styled'

export function Loader() {
  return (
    <LoaderWrapper>
      <LoaderSpinner />
    </LoaderWrapper>
  )
}
