import React from 'react'
import ReactDOM from 'react-dom/client'
import ImpatientButton from './impatient-button/ImpatientButton'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* Example usage of the impatient button.
        Set up a throttling on the network tab or change the click function so it takes a long time to be executed so you can really see the impatient wait. */}
      <ImpatientButton text="CLICK ME!!" handleClick={() =>  fetch(new Request('http://127.0.0.1:5173/')) }></ImpatientButton>
    </React.StrictMode>
  )