import { withInstall } from '../../utils/with-install'
import Grid from './grid.vue'
import GridItem from './grid-item.vue'

export const MtGrid = withInstall(Grid, 'MtGrid')
export const MtGridItem = withInstall(GridItem, 'MtGridItem')

export * from './types'
