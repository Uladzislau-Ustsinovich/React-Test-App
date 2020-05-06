import React from 'react'
import { LoaderWrapper } from './loader.styled'

export function Loader() {
  return (
    <LoaderWrapper>
      <div className="cssload-cube cssload-c1" />
      <div className="cssload-cube cssload-c2" />
      <div className="cssload-cube cssload-c4" />
      <div className="cssload-cube cssload-c3" />
    </LoaderWrapper>
  )
}
