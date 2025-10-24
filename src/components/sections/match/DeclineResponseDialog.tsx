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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MatchResponse } from "./AcceptResponseForm";
import { useUpdateMatchResponse } from "@/hooks/mutations/useUpdateMatchResponse";
import { toast } from "sonner";

function DeclineResponseDialog({ data }: { data: MatchResponse }) {
    const updateMatchMutation = useUpdateMatchResponse();

    async function onSubmit() {
        if (!data) return;
        try {
            await updateMatchMutation.mutateAsync({
                id: data?.id,
                status: "declined",
            });
            toast.success("Declined match!");
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update match");
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="destructive">Decline</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. You will not have the
                        opportunity to join this match again.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500"
                        onClick={onSubmit}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeclineResponseDialog;
