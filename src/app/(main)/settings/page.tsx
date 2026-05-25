"use client";

import { AlertTriangle, Camera, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const emailSchema = z.email("Invalid email address");

export default function SettingsPage() {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);

    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (session?.user.email) {
            setNewEmail(session.user.email);
        }
    }, [session]);

    const userInitial = session?.user.name?.[0].toUpperCase() ?? "?";

    async function handleUpdateEmail() {
        const result = emailSchema.safeParse(newEmail);

        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            setEmailError(errorMessage);
            return;
        }

        setEmailError(null);
        try {
            await authClient.changeEmail({
                newEmail: result.data,
                callbackURL: "/settings",
            });
            toast.success("Your email has been successfully changed!");
        } catch (error) {
            console.error("Error updating email:", error);
            toast.error("Error", {
                description: "Failed to update your email address.",
            });
        }
    }

    async function handleDeleteAccount() {
        try {
            await authClient.deleteUser();
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/");
                    },
                },
            });
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Something went wrong", {
                description: "Unable to delete your account. Please try again.",
            });
        }
    }

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push("/login");
        }
    }, [isPending, session, router]);

    if (isPending || !session?.user) return null;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16">
                <div className="mt-10 mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Settings</h1>
                    <p className="mt-1 text-sm font-light text-zinc-500">Manage your information and account</p>
                </div>

                <Card className="mb-5 rounded-2xl border-zinc-800 bg-zinc-900 shadow-none">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base font-medium text-zinc-100">Identity</CardTitle>
                        <CardDescription className="text-sm font-light text-zinc-500">
                            Your account information and profile picture
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        <div className="flex items-center gap-4 rounded-xl border border-blue-400/10 bg-blue-400/5 p-4">
                            <div className="relative shrink-0">
                                <Avatar className="h-14 w-14 ring-2 ring-blue-400/20">
                                    <AvatarImage src={session.user.image ?? ""} alt="Avatar" />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-300 to-blue-500 text-xl font-semibold text-zinc-900">
                                        {userInitial}
                                    </AvatarFallback>
                                </Avatar>
                                <Button
                                    className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-400 text-zinc-900 shadow"
                                    aria-label="Change picture"
                                >
                                    <Camera size={10} strokeWidth={2.5} />
                                </Button>
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-zinc-100">{session.user.name}</p>
                                <p className="mt-0.5 text-xs text-zinc-500">{session.user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                                Username
                            </Label>
                            <Input
                                value={session.user.name}
                                readOnly
                                className="h-10 cursor-default rounded-lg border-zinc-800 bg-zinc-950 text-zinc-100 opacity-60 placeholder:text-zinc-700 focus-visible:ring-0"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="email"
                                className="text-xs font-medium tracking-wide text-zinc-500 uppercase"
                            >
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={newEmail}
                                onChange={e => {
                                    setNewEmail(e.target.value);
                                    if (emailError) setEmailError(null);
                                }}
                                aria-invalid={!!emailError}
                                aria-describedby={emailError ? "email-error" : undefined}
                                className={cn(
                                    "bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-1 rounded-lg h-10",
                                    emailError
                                        ? "border-red-500/50 focus-visible:ring-red-500"
                                        : "focus-visible:ring-blue-500",
                                )}
                            />
                            {emailError && (
                                <p
                                    id="email-error"
                                    className="animate-in fade-in slide-in-from-top-1 mt-1 text-xs font-light text-red-400"
                                >
                                    {emailError}
                                </p>
                            )}
                        </div>

                        <Button
                            disabled={newEmail === session.user.email || !newEmail}
                            onClick={handleUpdateEmail}
                            className="h-9 bg-blue-600 px-4 text-xs font-medium text-white transition-all hover:bg-blue-700 disabled:opacity-50"
                        >
                            Save changes
                        </Button>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-red-900/40 bg-red-950/30 shadow-none">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={15} className="text-red-400" />
                            <CardTitle className="text-base font-medium text-red-400">Danger zone</CardTitle>
                        </div>
                        <CardDescription className="text-red-00/80 text-sm font-light">
                            This action is irreversible. Proceed with caution.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-red-400">Delete account</p>
                                <p className="mt-0.5 text-xs font-light text-zinc-500">
                                    Permanently delete all your data
                                </p>
                            </div>
                            <Button
                                size="sm"
                                className="w-full shrink-0 border border-red-500/25 bg-red-500/15 text-xs text-red-400 shadow-none hover:bg-red-500/25 sm:w-auto"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                <Trash2 size={13} className="mr-1.5" />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="rounded-2xl border-zinc-800 bg-zinc-900 text-zinc-100 sm:max-w-md">
                    <DialogHeader>
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/15">
                            <Trash2 size={20} className="text-red-400" />
                        </div>
                        <DialogTitle className="text-lg text-zinc-100">Delete account</DialogTitle>
                        <DialogDescription className="leading-relaxed font-light text-zinc-500">
                            This action is <span className="font-medium text-red-400">permanent and irreversible</span>.
                            All your data will be erased with no possibility of recovery.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex-col-reverse gap-2 sm:flex-row">
                        <Button
                            variant="outline"
                            className="w-full border-zinc-800 bg-transparent text-zinc-500 hover:border-zinc-700 hover:bg-transparent hover:text-zinc-100 sm:w-auto"
                            onClick={() => {
                                setIsDialogOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-full border border-red-500/25 bg-red-500/15 text-red-400 shadow-none hover:bg-red-500/25 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
                            onClick={handleDeleteAccount}
                        >
                            Delete permanently
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
