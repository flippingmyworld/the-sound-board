import React from "react"
import ReduxWrapper from "./src/redux"

const wrapper = ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  // const store = createStore();
  return <ReduxWrapper>{element}</ReduxWrapper>
}
export default wrapper
