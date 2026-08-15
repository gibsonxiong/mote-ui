/** Reads a nested field from an object with dot paths, e.g. get({a:{b:1}}, 'a.b') */
export function getByPath(source: Record<string, unknown> | undefined, path: string): unknown {
  if (!source) return undefined
  const segments = path.split('.')
  let current: unknown = source
  for (const segment of segments) {
    if (current === null || current === undefined) return undefined
    current = (current as Record<string, unknown>)[segment]
  }
  return current
}

/** Writes a nested field on an object with dot paths */
export function setByPath(target: Record<string, unknown>, path: string, value: unknown): void {
  const segments = path.split('.')
  let current = target as Record<string, unknown>
  for (let index = 0; index < segments.length - 1; index++) {
    const segment = segments[index]
    const next = current[segment]
    if (next === null || typeof next !== 'object') {
      current[segment] = {}
    }
    current = current[segment] as Record<string, unknown>
  }
  current[segments[segments.length - 1]] = value
}
