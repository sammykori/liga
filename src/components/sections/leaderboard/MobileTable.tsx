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

function MobileTable({ data }: { data: any[] }) {
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
                                            <span className="font-bold truncate text-xs">
                                                Szobaslia amkkisin asjkdakda
                                                aksjdaskj
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.gPts}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.tPts}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.mp}
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
                                            <span className="font-bold truncate text-xs">
                                                Szobaslia amkkisin asjkdakda
                                                aksjdaskj
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.gPts}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.tPts}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.mp}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.w}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.d}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.d}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.d}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.d}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.d}
                                    </TableCell>
                                    <TableCell className="text-center font-light text-xs">
                                        {player.d}
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
                                            <span className="font-bold truncate text-xs">
                                                Szobaslia amkkisin asjkdakda
                                                aksjdaskj
                                            </span>
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
