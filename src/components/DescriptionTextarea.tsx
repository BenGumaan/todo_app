import { useId } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type DescriptionTextareaProps = {
   label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescriptionTextarea = ({ label, value, onChange }: DescriptionTextareaProps) => {
  const id = useId()

  return (
    <div className='w-full space-y-2'>
      <div className='flex items-center justify-between gap-1'>
        <Label htmlFor={id}>{label}</Label>
        <span className='text-muted-foreground text-xs'>Optional field</span>
      </div>
      <Textarea value={value} onChange={onChange} placeholder='Type your task description here' id={id} />
    </div>
  )
}

export default DescriptionTextarea
