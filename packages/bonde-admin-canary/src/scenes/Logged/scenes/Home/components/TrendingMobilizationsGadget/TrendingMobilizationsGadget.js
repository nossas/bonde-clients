import React from 'react'
import { Grid, Cell, Panel } from 'bonde-styleguide'
import { Gadget } from 'components'
import { TrendingMobilizationsCellsLoading } from './components'

const TrendingMobilizationsGadget = ({ t, loading, mobilizations }) => (
  <Gadget title={t('gadgets.trendingMobilizations.title')}>
    <Grid>
      {loading
        ? <TrendingMobilizationsCellsLoading />
        : (
          <React.Fragment>
            {mobilizations.map(mobilization => (
              <Cell size={[3, 3]}>
                <Panel
                  image={mobilization.facebookShareImage}
                  title={mobilization.name}
                  description={mobilization.goal}
                  author={mobilization.community.name}
                />
              </Cell>
            ))}
          </React.Fragment>
        )
      }
    </Grid>
  </Gadget>
)

export default TrendingMobilizationsGadget
