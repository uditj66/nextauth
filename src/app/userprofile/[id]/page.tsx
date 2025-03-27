'use client'
import React from 'react'

function dynamicRoutes({params}:any) {
  return (
    <div>
      <h1>dynamicRoutes</h1>
      <h2>{params.id}</h2>
    </div>
  )
}

export default dynamicRoutes
