import { CrossStorageClient } from 'cross-storage'

// TODO: Check this variable, its coming undefined
const storage = new CrossStorageClient(import.meta.env.VITE_DOMAIN_CROSS_STORAGE || 'http://cross-storage.bonde.devel')

export default storage
