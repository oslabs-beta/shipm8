export const startLoading = state => {
  state.isLoading = true;
};

export const loadingFailed = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
