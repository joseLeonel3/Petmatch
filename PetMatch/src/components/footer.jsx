import React from 'react'
import "../components/footer.css"

const footer = () => {
  return (
    <footer className="footer">
      
      <div className='cardFooter'>
        <ul>
          <li>
            <h1>nosso endereço:</h1>                
          </li>
          
          <li>
             <h4>Apto 305 Bairro Jardim Aurora São Paulo SP</h4>   
          </li>
          
          <li>
             <h4>CEP: 04567-890</h4>
          </li>
        </ul>
      </div>
      
      <div className='cardFooter'>
        <ul>
          <li>
            <h1>contato</h1>      
          </li>
          
          <li>
             <h4>joao.teste742@gmail.com</h4>   
          </li>
          
          <li>
             <h4>Fixo: (21) 3456-7890</h4>
          </li>
        </ul>
      </div>
      
      <div className='copyright'><p>© 2026 PetMatch. Todos os direitos reservados.</p></div>
    
    </footer>
  )
}

export default footer