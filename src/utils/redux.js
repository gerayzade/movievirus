export const handleHydrateAction = ({ sliceName }) => {
  return (state, { payload }) => {
    const { payloadType } = payload[sliceName]
    return {
      ...state,
      [payloadType]: payload[sliceName][payloadType],
      payloadType: null,
    }
  }
}
