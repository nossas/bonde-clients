import { gql } from 'bonde-core-tools';

export default gql`
  query fetchDonationGoalStats($widgetId: Int!) {
    data: getWidgetDonationStats(widgetId: $widgetId)
  }
`
