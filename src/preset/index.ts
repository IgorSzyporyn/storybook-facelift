interface ThemedOptions {
  addDecorator?: boolean
}

export function managerEntries(entry: any[] = []) {
  return [...entry, require.resolve('../register')]
}

export function config(entry: any[] = [], { addDecorator = true }: ThemedOptions = {}) {
  const themedConfig = []

  if (addDecorator) {
    themedConfig.push(require.resolve('./addDecorator'))
  }

  return [...entry, ...themedConfig]
}
