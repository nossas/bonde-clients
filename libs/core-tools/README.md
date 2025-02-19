# bonde-core-tools User Guide

Congrats!

## Development Commands

TSDX scaffolds your new library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, [we use Parcel's aliasing](https://github.com/palmerhq/tsdx/pull/88/files).

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## API Reference

### Components

#### BondeSessionProvider

A provider of session for applications "Bonde React", based on [https://github.com/apollographql/apollo-client](apollo-client) and [https://github.com/zendesk/cross-storage](cross-storage).

```typescript
type Modules = {
  // 
  [module: 'settings' | 'mobilization' | 'chatbot' | 'redes']: string;
};

type Config = {
  modules: Modules;
  crossStorageUrl: string;
  graphqlApiUrl: string;
};

interface SessionProviderProps {
  children: any;
  loading: React.FC<LoadingProps>;
  // For props fetchData true, userInfo and communities are fetched. Default: false
  fetchData?: boolean;
  config: Config;
}
```

**API request**

1. Fetch Session on cross-storage
2. Fetch User on api-graphql. Only fetchData is true.
3. Fetch Communities on api-graphql. Only fetchData is true.

**Types and Context**

```typescript
type User = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  createdAt: string;
  avatar?: string;
};

type Community = {
  id: number;
  name: string;
  city: string;
  image?: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

type Context = {
  signing: boolean;
  authenticated: boolean;
  community?: Community;
  communities: Community[];
  user: User;
  logout: Function;
  onChange: Function;
};
```

#### BondeSessionUI

Render a page based on `bonde-components` with Header and Footer, to view content with height full size you should setup index.html with following style.

```css
html, body, #root {
  height: 100%;
}
```

**NOTE:** We recommend using this component to render the base of your application, it already has a menu for community selection and a menu with user functions such as logout for example.

#### Full example

```typescript
import { BondeSessionProvider, BondeSessionUI } from 'bonde-core-tools'

export default () => {
  const config = {
    // your configurations urls
    // ...
  }
  return (
    <BondeSessionProvider config={config} fetchData>
      <BondeSessionUI.Main>
        <BondeSessionUI.Content>
        {/* children / routing */}
        </BondeSessionUI.Content>
      </BondeSessionUI.Main>
    </BondeSessionProvider>
  )
}
```

#### Configure your modules to Community context

Create a file `bondeconfig.{ts | js}` with the redirect settings:

```typescript
export default {
  "development": {
    "accounts": "http://accounts.bonde.devel:5000/login",
    "settings": "http://admin-canary.bonde.devel:5001/community/settings",
    "mobilization": "http://app.bonde.devel:5002/mobilizations",
    "chatbot": "http://chatbot.bonde.devel:5003",
    "redes": "http://redes.bonde.devel:5004"
  },
  "staging": {
    "accounts": "https://accounts.staging.bonde.org/login",
    "mobilization": "https://app.staging.bonde.org",
    "settings": "https://admin-canary.staging.bonde.org",
    "chatbot": "https://chatbot.staging.bonde.org",
    "redes": "https://redes.staging.bonde.org"
  },
  "production": {
    "accounts": "https://accounts.bonde.org/login",
    "mobilization": "https://app.bonde.org",
    "settings": "https://admin-canary.bonde.org",
    "chatbot": "https://chatbot.bonde.org",
    "redes": "https://redes.bonde.org"
  }
}
```

Load Bonde, use

### HOCs

#### useSession

Returns the information stored in the session context, it can only be called below the SessionProvider.

```typescript
import { useSession } from 'bonde-core-tools'
```

#### Apollo Graphql HOCs

Always use the `useQuery` and `useMutation` methods exported by our module, this avoids problems with the
contextualization of the graphql client.

```typescript
import { useMutation, useQuery } from 'bonde-core-tools'
```

## Continuous Integration

### Travis

_to be completed_

### Circle

_to be completed_