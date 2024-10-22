'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { appStore, AppStore } from './store/redux-store';

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
})
{
  const storeRef = useRef<AppStore>()
  if (!storeRef.current)
  {
    storeRef.current = appStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}