import { toSnakeCase } from './utils'

test('should convert deep object to snake case keys', t => {
  const obj = {
    id: 1,
    createdAt: "2018-11-14T13:20:22.002167",
    updatedAt: "2018-11-20T14:06:05.213214",
    sharing: {
      fbLink: null,
      twitterLink: null,
      facebookAppId: null
    },
    emailTemplateFrom: "Igor 9 Santos <igor@nossas.org>"
  }
  const expectedObj = {
    id: 1,
    created_at: "2018-11-14T13:20:22.002167",
    updated_at: "2018-11-20T14:06:05.213214",
    sharing: {
      fb_link: null,
      twitter_link: null,
      facebook_app_id: null
    },
    email_template_from: "Igor 9 Santos <igor@nossas.org>"
  }

  t.deepEqual(toSnakeCase(obj), expectedObj)
})
