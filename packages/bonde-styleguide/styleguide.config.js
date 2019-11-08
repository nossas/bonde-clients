const path = require('path')

module.exports = {
  sections: [
    {
      name: 'Content',
      description: 'The list of content components.',
      components: 'src/components/content/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Cards',
      description: 'The list of card components.',
      components: 'src/components/cards/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'List',
      description: 'The list of list components.',
      components: 'src/components/list/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Progress',
      description: 'The list of progress components.',
      components: 'src/components/progress/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Navigation',
      description: 'The list of navigation components.',
      components: 'src/components/navigation/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Form',
      description: 'The list of form components.',
      components: 'src/components/form/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Await',
      description: 'The list of components to await steps.',
      components: 'src/components/await/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Layout',
      description: 'The list of components that modify layout.',
      components: 'src/components/layout/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Assets',
      description: 'The list of assets components.',
      components: 'src/components/assets/[A-Z]*/[A-Z]*.js'
    }
  ],
  contextDependencies: [path.resolve(__dirname, 'src')],
  // skipComponentsWithoutExample: true,
  // getComponentPathLine(componentPath) {
  //   const name = path.basename(componentPath, '.js')
  //   return `import { ${name} } from 'bonde-styleguide'`
  // },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/ThemeWrapper'),
  } 
}