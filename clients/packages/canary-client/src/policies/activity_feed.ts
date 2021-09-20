export default {
  keyArgs: ["after", "widgetId", "offset"],
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  merge: (previousResult: any, fetchMoreResult: any): any => {
    console.log({ previousResult, fetchMoreResult })
    if (previousResult) {
      const newData = fetchMoreResult.data;
      const newAfter = fetchMoreResult.after;

      return newData.length
        ? {
            "__typename": "ActivittyFeedResponse",
            data: [...previousResult.data, ...newData],
            after: newAfter
          }
        : previousResult
    }
    return fetchMoreResult;
  }
}