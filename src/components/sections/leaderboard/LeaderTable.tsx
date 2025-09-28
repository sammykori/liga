import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PlayerRating } from "@/types/mock";

function LeaderTable({ data: mockLeaderboard }: { data: PlayerRating[] }) {
    return (
        <Card className="py-0 rounded-r-none">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">G Pts</TableHead>
                        <TableHead className="text-center">T Pts</TableHead>
                        <TableHead className="text-center">MP</TableHead>
                        <TableHead className="text-center">W</TableHead>
                        <TableHead className="text-center">D</TableHead>
                        <TableHead className="text-center">D</TableHead>
                        <TableHead className="text-center">D</TableHead>
                        <TableHead className="text-center">D</TableHead>
                        <TableHead className="text-center">D</TableHead>
                        <TableHead className="text-center">D</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockLeaderboard.map((player, index) => (
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
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <span className="font-medium">
                                        {player.name}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="text-center font-medium">
                                {player.gPts}
                            </TableCell>
                            <TableCell className="text-center font-medium">
                                {player.tPts}
                            </TableCell>
                            <TableCell className="text-center">
                                {player.mp}
                            </TableCell>
                            <TableCell className="text-center">
                                {player.w}
                            </TableCell>
                            <TableCell className="text-center">
                                {player.d}
                            </TableCell>
                            <TableCell className="text-center">
                                {player.d}
                            </TableCell>
                            <TableCell className="text-center">
                                {player.d}
                            </TableCell>
                            <TableCell className="text-center">
                                {player.d}
                            </TableCell>
                            <TableCell className="text-center">
                                {player.d}
                            </TableCell>
                            <TableCell className="text-center">
                                {player.d}
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}

export default LeaderTable;
