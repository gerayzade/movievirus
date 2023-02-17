export const handleHydrateAction = ({ sliceName }) => {
  return (state, { payload }) => {
    const { statePropKey } = payload[sliceName]
    const nextState = {
      ...state,
      statePropKey: null,
    }
    if (statePropKey) {
      nextState[statePropKey] = payload[sliceName][statePropKey]
    }
    return nextState
  }
}

export const handlePendingAction = () => {
  return (state) => {
    return {
      ...state,
      loading: true,
    }
  }
}

export const handleRejectedAction = () => {
  return (state) => {
    return {
      ...state,
      loading: false,
    }
  }
}

export const handleFulfilledAction = ({ statePropKey }) => {
  return (state, { payload }) => {
    return {
      ...state,
      [statePropKey]: payload,
      statePropKey,
      loading: false,
    }
  }
}
