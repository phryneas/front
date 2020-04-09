import { css } from 'lit-element'

export default css`
  :host {
    display: flex;
    flex-direction: row;
    /* border: 5px dotted green; */
  }
  .middle {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`