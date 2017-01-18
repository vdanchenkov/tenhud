import React from 'react'
import { observer } from 'mobx-react'
import Tile from './Tile'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

const PlayerDiscard = styled.div`
  flex: 1;
`

const Tiles = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const TileContainer = styled.div`
  ${props => props.tsumogiri ?
    `
      &>div { opacity: 0.8; };
      background: blue;
    ` : ''}
`

const H1 = styled.h1`
  color: white;
  font-face: Helvetica;
`

const Discards = ({ store }) => (
  <div>
    <H1>Discards</H1>
    <Container>
      { [1, 2, 3].map(player => (
        <PlayerDiscard key={player}>
          Player: {player}
          <Tiles>
            { store.discards[player].map(move => (
              <TileContainer key={move.tile} tsumogiri={move.tsumogiri}>
                <Tile tile={move.tile} width={20} height={25}/>
              </TileContainer>
            ))}
          </Tiles>
        </PlayerDiscard>
      )) }
    </Container>
  </div>
)

export default observer(Discards)
