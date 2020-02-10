import React from 'react'
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core'

const TypeExtra = (props) => {
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Tipo</FormLabel>
        <RadioGroup aria-label="tipo" name="tipo">
          {props.item.type.map((e, i) => 
            <FormControlLabel key={i} value={e} control={<Radio />} label={e} onClick={() =>{props.onTypeSelect(e)}}/>
          )}
        </RadioGroup>
        <FormLabel component="legend">Extra</FormLabel>
        <RadioGroup aria-label="extra" name="extra">
          {props.item.extra.map((e, i) => 
            <FormControlLabel key={i} value={e.name} control={<Radio />} label={`${e.name} R$ ${e.price}`}  onClick={() => {props.onExtraSelect(e)}}/>
          )}
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default TypeExtra
