import uuid from 'uuid/v1'

export const generateUniqid = () => uuid()
export const permittedDevices = () => navigator.mediaDevices.enumerateDevices()
export const userMediaSupported = (prom) => !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia)
