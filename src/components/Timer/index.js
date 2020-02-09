import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Timer = (props) => {
  const [time, setTime] = useState('')
  let diff = new Date() - new Date(props.date.seconds * 1000)
  const hh = Math.floor(diff / 1000 / 60 / 60)
  diff -= hh * 1000 * 60 * 60
  const mm = Math.floor(diff / 1000 / 60)
  diff -= mm * 1000 * 60
  const ss = Math.floor(diff / 1000)
  diff += ss * 1000
  // setTime(`${hh}:${mm}:${ss}`)
  return (
    <span>
      {ss}
    </span>
  )
}

Timer.propTypes = {
  date: PropTypes.any.isRequired
}

const formatter = (date) => {
  
}

export default {
  Timer,
  formatter
}
