import { create } from 'zustand'
import axios from 'axios'

interface KeywordStore {
  jobId: string | null
  keywords: string[]
  status: 'idle' | 'loading' | 'done' | 'error'
  startPolling: (jobId: string) => void
  reset: () => void
}

export const KeywordStore = create<KeywordStore>((set) => ({
  jobId: null,
  keywords: [],
  status: 'idle',

  startPolling: (jobId: string) => {
    set({ jobId, status: 'loading' })

    const poll = setInterval(async () => {
      try {
        const res = await axios.get(`/result?jobId=${jobId}`)

        if (res.data.status === 'done') {
          set({ keywords: res.data.keywords, status: 'done' })
          clearInterval(poll)
        }
      } catch (err) {
        console.error('폴링 중 오류:', err)
        set({ status: 'error' })
        clearInterval(poll)
      }
    }, 2000)
  },

  reset: () => set({ jobId: null, keywords: [], status: 'idle' })
}))
