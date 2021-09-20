import activity_feed from "./activity_feed";

export default {
  // Policies to fetchMore activiy_feed
  typePolicies: {
    Query: {
      fields: {
        activity_feed
      }
    }
  }
}