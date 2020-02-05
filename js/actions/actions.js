// import actionType constants
import * as types from '../constants/actionsTypes'

export const addApi = (obj) => ({
  type: types.ADD_API,
  payload: {
    accessKeyId: obj.accessKeyId,
    secretAccessKey: obj.secretAccessKey,

  }
});