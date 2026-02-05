'use client'
import LiveMatchesCarousel from '@/components/sections/home/LiveMatchesCarousel'
import SelectGroup from '@/components/sections/SelectGroup'
import UpcomingMatches from '@/components/sections/home/UpcomingMatches'
import TopPlayers from '@/components/sections/home/TopPlayers'
import { useGroup } from '@/hooks/useGroups'
import { useAuthUser } from '@/hooks/useAuthUser'
import LoadingScreen from '@/components/LoadingScreen'
import { useState } from 'react'
import EmptyScreen from '@/components/EmptyScreen'
import { JoinGroupModal } from '@/components/JoinGroupModal'

export default function Home() {
    const [groupId, setGroupId] = useState<string>()
    const { data: user, isLoading: isUserLoading } = useAuthUser()
    const [openJoinModal, setOpenJoinModal] = useState(false)

    const { data: groups, isLoading: isGroupsLoading } = useGroup(user?.id)

    if (isUserLoading || isGroupsLoading) {
        return <LoadingScreen />
    }

    const hasNoGroups = !groups || groups.length < 1

    return (
        <>
            {hasNoGroups ? (
                <EmptyScreen />
            ) : (
                <div className="container mx-auto px-4 pt-4 pb-8 space-y-8">
                    {/* Group Section */}
                    {groups && (
                        <SelectGroup
                            groups={groups}
                            groupId={groupId}
                            setGroupId={setGroupId}
                        />
                    )}

                    {/* Live Match Section */}
                    <LiveMatchesCarousel groupId={groupId} />

                    {/* Upcoming Matches Section */}
                    <UpcomingMatches groupId={groupId} />

                    {/* Top Players Section */}
                    <TopPlayers groupId={groupId} />
                </div>
            )}
            <JoinGroupModal
                open={openJoinModal}
                onOpenChange={setOpenJoinModal}
            />
        </>
    )
}
