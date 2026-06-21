import { useState } from 'react'

import LineasProcesoPage from './modules/lineas_proceso/LineasProcesoPage'

function App() {

  return (
    <>
      <nav className="blue darken-3">
        <div className="nav-wrapper" style={{ padding: "0px 20px"}}>
          <span className="brand-log" style={{ padding: "20px"}}>Agro App</span>
        </div>
      </nav>
      <main className="container" style={{ marginTop: "30px"}}>
          <LineasProcesoPage/>
      </main>
    </>
  )
}

export default App
