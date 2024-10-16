'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { appStore, AppStore } from '../lib/store/redux-store';

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = appStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}