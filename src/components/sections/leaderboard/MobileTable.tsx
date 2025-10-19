import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GroupMembershipWithStats } from "@/components/PlayerCard";

function MobileTable({ data }: { data: GroupMembershipWithStats[] }) {
    if (!data) return;
    return (
        <Tabs defaultValue="short" className="w-full">
            <TabsList className="w-full ">
                <TabsTrigger value="short">Short</TabsTrigger>
                <TabsTrigger value="full">Full</TabsTrigger>
                <TabsTrigger value="form">Form</TabsTrigger>
            </TabsList>
            <TabsContent value="short">
                <Card className="py-2 border-none">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-light text-xs">
                                    Pos
                                </TableHead>
                                <TableHead className="font-light text-xs sticky left-0 z-10 bg-white">
                                    Name
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    Rating
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    Points
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    POTMs
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((player, index) => (
                                <motion.tr
                                    key={player.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                    }}
                                    className="hover:bg-muted/50"
                                >
                                    <TableCell className=" flex items-center gap-1 py-4 text-xs font-bold">
                                        {index + 1}{" "}
                                        <Icon
                                            icon="ph:caret-up-thin"
                                            className="text-green-500 size-2.5"
                                        />
                                    </TableCell>
                                    <TableCell className="max-w-[150px] sticky left-0 z-10 bg-white">
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src="/images/avatar.jpeg" />
                                                <AvatarFallback>
                                                    CN
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="w-[80%] flex flex-col ">
                                                <p className="font-bold truncate text-xs">
                                                    {
                                                        player.profiles
                                                            ?.first_name
                                                    }{" "}
                                                    {player.profiles?.last_name}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {player.profiles?.position}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.player_group_stats?.rating || 0}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.player_group_stats?.rating}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {
                                            player.player_group_stats
                                                ?.matches_played
                                        }
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </TabsContent>
            <TabsContent value="full">
                <Card className="py-2 border-none">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-light text-xs">
                                    Pos
                                </TableHead>
                                <TableHead className="font-light text-xs sticky left-0 z-10 bg-white">
                                    Name
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    G Pts
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    T Pts
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    MP
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    W
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    D
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    D
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    D
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    D
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    D
                                </TableHead>
                                <TableHead className="text-center font-light text-xs">
                                    D
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((player, index) => (
                                <motion.tr
                                    key={player.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                    }}
                                    className="hover:bg-muted/50"
                                >
                                    <TableCell className=" flex items-center gap-1 py-4 text-xs font-bold">
                                        {index + 1}{" "}
                                        <Icon
                                            icon="ph:caret-up-thin"
                                            className="text-green-500 size-2.5"
                                        />
                                    </TableCell>
                                    <TableCell className="max-w-[150px] sticky left-0 z-10 bg-white">
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src="/images/avatar.jpeg" />
                                                <AvatarFallback>
                                                    CN
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="w-[80%] flex flex-col ">
                                                <p className="font-bold truncate text-xs">
                                                    {
                                                        player.profiles
                                                            ?.first_name
                                                    }{" "}
                                                    {player.profiles?.last_name}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {player.profiles?.position}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.player_group_stats?.rating || 0}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.player_group_stats?.rating || 0}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.player_group_stats
                                            ?.matches_played || 0}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.player_group_stats?.assists ||
                                            0}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.player_group_stats?.assists ||
                                            0}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.player_group_stats?.assists ||
                                            0}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.player_group_stats?.assists ||
                                            0}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.player_group_stats?.assists ||
                                            0}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.player_group_stats?.assists ||
                                            0}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.player_group_stats?.assists ||
                                            0}
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </TabsContent>
            <TabsContent value="form">
                <Card className="py-2 border-none">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-light text-xs">
                                    Pos
                                </TableHead>
                                <TableHead className="font-light text-xs sticky left-0 z-10 bg-white">
                                    Name
                                </TableHead>
                                <TableHead className=" font-light text-xs">
                                    Form
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((player, index) => (
                                <motion.tr
                                    key={player.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                    }}
                                    className="hover:bg-muted/50"
                                >
                                    <TableCell className=" flex items-center gap-1 py-4 text-xs font-bold">
                                        {index + 1}{" "}
                                        <Icon
                                            icon="ph:caret-up-thin"
                                            className="text-green-500 size-2.5"
                                        />
                                    </TableCell>
                                    <TableCell className="max-w-[150px] sticky left-0 z-10 bg-white">
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src="/images/avatar.jpeg" />
                                                <AvatarFallback>
                                                    CN
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="w-[80%] flex flex-col ">
                                                <p className="font-bold truncate text-xs">
                                                    {
                                                        player.profiles
                                                            ?.first_name
                                                    }{" "}
                                                    {player.profiles?.last_name}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {player.profiles?.position}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="flex items-center gap-2 text-center text-[9px] text-white font-bold">
                                        <div className="bg-green-600 size-5 shadow-sm rounded-full flex justify-center items-center">
                                            W
                                        </div>
                                        <div className="bg-red-600 size-5 shadow-sm rounded-full flex justify-center items-center">
                                            L
                                        </div>
                                        <div className="bg-gray-400 size-5 shadow-sm rounded-full flex justify-center items-center">
                                            D
                                        </div>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

export default MobileTable;
