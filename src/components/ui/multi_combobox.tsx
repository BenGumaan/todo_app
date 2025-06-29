'use client'
import * as React from 'react'
import { ChevronsUpDown, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Popover, PopoverTrigger, PopoverContent,
} from '@/components/ui/popover'
import {
  Command, CommandInput, CommandEmpty,
  CommandGroup, CommandItem, CommandList,
} from '@/components/ui/command'
import { ScrollArea } from '@/components/ui'

interface Option { value: string; label: string }
interface Props {
  options: Option[]
  selected: string[]
  onChange: (vals: string[]) => void
  placeholder?: string
}

export function MultiCombobox({
  options, selected, onChange, placeholder = 'Select…',
}: Props) {
  const [open, setOpen] = React.useState(false)
  const [q, setQ] = React.useState('')
  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(q.toLowerCase())
  )

  const toggle = (v: string) =>
    selected.includes(v)
      ? onChange(selected.filter(x => x !== v))
      : onChange([...selected, v])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={cn(
          'flex flex-wrap gap-1 p-2 border rounded w-64',
          selected.length === 0 && 'text-gray-400'
        )}>
          {selected.length > 0
            ? options.filter(o => selected.includes(o.value)).map(o => (
                <span key={o.value} className="bg-blue-100 px-2 rounded flex items-center">
                  {o.label}
                  <X className="ml-1 w-4 h-4 cursor-pointer" onClick={e => { e.stopPropagation(); toggle(o.value) }} />
                </span>
              ))
            : placeholder
          }
          <ChevronsUpDown className="ml-auto w-5 h-5 opacity-50" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-0">
        <Command>
          <CommandInput
            placeholder="Search…"
            value={q}
            onValueChange={setQ}
            className="h-9"
          />
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup>
            <ScrollArea>
              <CommandList className="max-h-56">
                {filtered.map(o => (
                  <CommandItem
                    key={o.value}
                    value={o.value}
                    onSelect={() => toggle(o.value)}
                  >
                    <Check className={cn(
                      'mr-2 w-4 h-4',
                      selected.includes(o.value) ? 'opacity-100' : 'opacity-0'
                    )} />
                    {o.label}
                  </CommandItem>
                ))}
              </CommandList>
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
