import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import {} from '../../utils/numberUtils'

const useStyles = makeStyles({
  table: {
    width: '100%'
  },
  tableCell: {
    width: 'auto',
    padding: '6px 0 6px 16px'
  }
})

export default function Receipt (props) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='Pedido'>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} align='Left'>Nº</TableCell>
            <TableCell className={classes.tableCell} align='Left'>Item</TableCell>
            <TableCell className={classes.tableCell} align='Left'>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((item, i) =>
            <TableRow key={i}>
              <TableCell className={classes.tableCell}>{i + 1}</TableCell>
              <TableCell className={classes.tableCell} component='th' scope='row'>{item.name}</TableCell>
              <TableCell className={classes.tableCell} align='right'>{item.price.format(2, 3, '.', ',')}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Receipt.propTypes = {
  items: PropTypes.array.isRequired
}
