import gql from 'graphql-tag'

export default gql`
  query CurrentUserCommunities {
    communities {
      id
      name
      city
      description
      image
      created_at
      updated_at
      mailchimp_api_key
      mailchimp_list_id
      mailchimp_group_id
      fb_link
      twitter_link
      facebook_app_id
      email_template_from
      modules
    }
  }
`
