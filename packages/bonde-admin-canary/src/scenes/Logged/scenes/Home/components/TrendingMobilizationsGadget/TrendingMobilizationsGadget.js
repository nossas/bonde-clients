import React from 'react'
import { Grid, Cell, Panel, Spacing, Flexbox2 as Flexbox } from 'bonde-styleguide'
import { Gadget } from 'components'
import {
  TrendingMobilizationsCellsLoading,
  TrendingMobilizationsFilter
} from './components'

const TrendingMobilizationsGadget = ({ t, loading, mobilizations }) => (
  <Gadget
    title={t('gadgets.trendingMobilizations.title')}
    renderFilter={() => (
      <Flexbox>
        <Spacing margin={{ right: 8 }}>
          <Gadget.Title>
            {t('gadgets.trendingMobilizations.filtersAdornment')}
          </Gadget.Title>
        </Spacing>
        <TrendingMobilizationsFilter t={t} />
      </Flexbox>
    )}
  >
    <Grid>
      {loading
        ? <TrendingMobilizationsCellsLoading />
        : mobilizations.map(mobilization => (
          <React.Fragment key={Math.random()}>
            <Cell size={[3, 3]}>
              <Panel
                image={mobilization.facebookShareImage}
                title={mobilization.name}
                description={mobilization.goal}
                author={mobilization.community.name}
              />
            </Cell>
          </React.Fragment>
        ))

      }
    </Grid>
  </Gadget>
)

export default TrendingMobilizationsGadget
