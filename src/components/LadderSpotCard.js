import React from 'react'

const LadderSpotCard = (props) => {
  return (
    <div className="spot-card" key={props.player.id}>
      <h3>{props.player.ladder_spot}. {props.player.first_name} {props.player.last_name}</h3>
    </div>
  )
}

export default LadderSpotCard
