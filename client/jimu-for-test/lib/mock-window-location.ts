export interface WindowLocationMockHandle {
  unMock: () => void
}
/** Mock the window.location */
export function mockWindowLocation (loc: Partial<Location>): WindowLocationMockHandle {
  const { location } = window

  delete window.location
  window.location = {
    href: '',
    pathname: '/',
    search: '',
    ...loc
  } as any

  return {
    unMock: () => {
      window.location = location as any
    }
  }
}
