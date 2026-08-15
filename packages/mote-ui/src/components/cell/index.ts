import { withInstall } from '../../utils/with-install'
import Cell from './cell.vue'
import CellGroup from './cell-group.vue'

export const MtCell = withInstall(Cell, 'MtCell')
export const MtCellGroup = withInstall(CellGroup, 'MtCellGroup')

export * from './types'
