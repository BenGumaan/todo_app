import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react';
import { FC, useState } from 'react'

interface DeleteTodoPromptProps {
  onConfirm: () => void;
}

export const DeleteTodoPrompt: FC<DeleteTodoPromptProps> = ({ onConfirm }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          aria-label="Delete task"
        >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
        </DialogHeader>
        <Label htmlFor="task-name" className='mb-2'>Are you sure you want to delete this Todo?</Label>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
