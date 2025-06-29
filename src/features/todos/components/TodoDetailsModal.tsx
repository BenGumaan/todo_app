import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Todo } from '@/features/todos'

type TodoDetailsModalProps = {
  todo: Todo
  children: React.ReactNode
}

const TodoDetailsModal = ({ todo, children }: TodoDetailsModalProps) => {
  if (!todo) {
    return null
  }  
  
  const todoFields = [
    { label: 'ID', value: todo.id },
    { label: 'Todo', value: todo.text },
    { label: 'Description', value: todo.description || 'No description' },
    { label: 'Tags', value: todo.tags.length > 0 ? todo.tags.join(', ') : 'No tags' },
    { label: 'Status', value: todo.completed ? 'Completed' : 'Pending' },
    { label: 'Created At', value: todo.createdAt },
    { label: 'Date', value: todo.date }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Todo Details</DialogTitle>
        </DialogHeader>
        <div className='rounded-md border'>
          <Table className='table-fixed'>
            <TableBody>
              {todoFields.map((field) => (
                <TableRow key={`${todo.id}-${field.label}`}>
                  <TableCell className='truncate font-medium w-1/3'>
                    {field.label}
                  </TableCell>
                  <TableCell className='truncate'>
                    {field.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TodoDetailsModal