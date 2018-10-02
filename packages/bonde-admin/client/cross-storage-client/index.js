import { CrossStorageClient } from 'cross-storage'

// TODO: Check this variable, its coming undefined
const storage = new CrossStorageClient(process.env.CROSS_STORAGE_URL || 'http://cross-storage.bonde.devel')

export default storage
