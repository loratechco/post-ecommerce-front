import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface AlertDialogDeleteProps {
  onDelete: () => void;
  trigger?: React.ReactNode;
}

export function AlertDialogDelete({ onDelete, trigger }: AlertDialogDeleteProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || <Button variant="outline">حذف</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>آیا از حذف اطمینان دارید؟</AlertDialogTitle>
          <AlertDialogDescription>
            این عملیات غیرقابل برگشت است و داده‌های مربوطه به طور کامل حذف خواهند شد.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>انصراف</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>حذف</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 