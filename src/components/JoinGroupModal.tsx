import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

type JoinGroupModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function JoinGroupModal({ open, onOpenChange }: JoinGroupModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <div className="flex flex-col justify-center items-center">
                        <div className="grid gap-3">
                            <Icon
                                icon="line-md:email-arrow-right-filled"
                                className="size-20 text-green-500"
                            />
                        </div>
                        <div className=" flex flex-col items-center">
                            <DialogTitle className="font-bold text-2xl">
                                Join Request Sent
                            </DialogTitle>
                            <DialogDescription className="text-center">
                                Wait for Admin approval to be added to group.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}
