import { useState, useEffect } from 'react';
import POL from '../tokens/defaultToken.json';
// Use web3/modal for wallet connection
// Use Uniswap SDK or call router

function TokenSwapPOL() {
  const [price, setPrice] = useState('-');
  const [amount, setAmount] = useState('');
  const [pair, setPair] = useState(POL.defaultPairings[0]);

  useEffect(() => {
    // Fetch price from DEX or Chainlink here
    // Example stub: setPrice(1.05);
  }, []);

  const handleSwap = async () => {
    // Integrate Uniswap Router call for swap
    alert(`Swapping ${amount} ${POL.symbol} to ${pair}`);
  };

  return (
    <div>
      <img src={POL.logoURI} alt="POL" width={44}/>
      <h3>{POL.name} ({POL.symbol})</h3>
      <div>Live Price: ${price}</div>
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount"/>
      <select value={pair} onChange={e => setPair(e.target.value)}>
        {POL.defaultPairings.map(p => (<option key={p}>{p}</option>))}
      </select>
      <button onClick={handleSwap}>Swap</button>
    </div>
  );
}
export default TokenSwapPOL;