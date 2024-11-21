import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FormInput from "./FormInput"

interface ProfileFormProps extends React.ComponentProps<"form"> {
    onSubmit: (data: any) => void;
    fields: {
        id: string;
        type: string;
        nameLabel: string;
        placeholder?: string;
    }[];
    register: any;
    errors: any;
}

function ProfileForm({ className, onSubmit, fields, register, errors }: ProfileFormProps) {
    return (
        <form onSubmit={onSubmit} className={cn("grid items-start gap-4", className)}>
            {fields.map((field) => (
                <FormInput
                    key={field.id}
                    id={field.id}
                    type={field.type || "text"}
                    nameLabel={field.nameLabel}
                    placeholder={field.placeholder}
                    register={register(field.id)}
                />
            ))}
            <Button type="submit">ذخیره تغییرات</Button>
        </form>
    )
}

interface DrawerDialogAddUserProps {
    onSubmit: (data: any) => void;
    fields: {
        id: string;
        type: string;
        nameLabel: string;
        placeholder?: string;
    }[];
    register: any;
    errors: any;
}

export function DrawerDialogAddUser({ onSubmit, fields, register, errors }: DrawerDialogAddUserProps) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">ایجاد کاربر جدید</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>ایجاد کاربر جدید</DialogTitle>
                        <DialogDescription>
                            لطفا اطلاعات کاربر جدید را وارد کنید
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileForm
                        onSubmit={onSubmit}
                        fields={fields}
                        register={register}
                        errors={errors}
                    />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">create user</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Create new user</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DrawerDescription>
                </DrawerHeader>
                <ProfileForm
                    className="px-4"
                    onSubmit={onSubmit}
                    fields={fields}
                    register={register}
                    errors={errors}
                />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

