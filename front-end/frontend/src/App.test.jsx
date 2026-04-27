import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn((url, options) => {
      if (!options) {
        return Promise.resolve({
          json: () => Promise.resolve([]),
        })
      }

      if (options.method === 'POST') {
        const body = JSON.parse(options.body)

        return Promise.resolve({
          json: () => Promise.resolve({ id: 1, title: body.title }),
        })
      }

      return Promise.resolve({
        json: () => Promise.resolve({}),
      })
    }))
  })

  it('renders the empty state and adds a ticket', async () => {
    render(<App />)

    expect(await screen.findByText('No tickets yet')).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('Enter ticket'), {
      target: { value: 'Printer is jammed' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Add Ticket' }))

    expect(await screen.findByText('Printer is jammed')).toBeInTheDocument()
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5002/api/tickets',
      expect.objectContaining({
        method: 'POST',
      }),
    )
  })
})