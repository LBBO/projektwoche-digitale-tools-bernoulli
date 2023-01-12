import './Coin.css'

export enum CoinSide {
  Heads = 'heads',
  Tails = 'tails',
}

// Copied from https://codepen.io/adamjld/pen/oNmRJR
export const Coin = (props: { spinning?: boolean; side?: CoinSide }) => {
  return (
    <div
      className={`coin ${props.side === CoinSide.Heads ? 'heads' : ''} ${
        props.spinning ? 'spinning' : ''
      }`}
    >
      <article className="back"></article>
      <article className="middle"></article>
      <article className="middle"></article>
      <article className="middle"></article>
      <article className="middle"></article>
      <article className="middle"></article>
      <article className="middle"></article>
      <article className="middle"></article>
      <article className="middle"></article>
      <article className="middle"></article>
      <article className="front"></article>
    </div>
  )
}
