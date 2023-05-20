/* eslint-disable react/prop-types */
export function Veiculos({ entregadores }) {
    return(
        <>
        {entregadores.map(ent => (
            <div key="veiculo" className='Veiculo'>
                {ent.veiculos ? 
                  <details className='Detalhes' style={{ display: 'inline' }}>
                    <summary>{ent.nome} | Id: {ent.id}</summary>
                    {ent.veiculos.map(vei => (
                    <details key="detalhes">
                      <summary>{vei.marca} {vei.modelo}</summary>
                      <ul>
                          <li>{vei.marca}</li>
                          <li>{vei.modelo}</li>
                          <li>{vei.cilindradas} cilindradas</li>
                          <li>Placa: {vei.placa}</li>
                          <li>Ano: {vei.ano}</li>
                      </ul>
                    </details>
                    ))}
                  </details>
                : ''}
            </div>
            ))}
        </>
    )
}